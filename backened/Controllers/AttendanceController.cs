using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Human_Resource_Management_System.Data;
using Human_Resource_Management_System.DTOs;
using Human_Resource_Management_System.Models;
using AutoMapper;
using System.Security.Claims;
using static Human_Resource_Management_System.Models.Enums;

namespace Human_Resource_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Locks all endpoints to logged-in users
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AttendanceController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #region Check In
        [HttpPost("check-in")]
        public async Task<IActionResult> CheckIn()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);
            if (employee == null) return NotFound("Employee profile not found.");

            var today = DateTime.UtcNow.Date;

            // Fix: Compare Date part only
            var existing = await _context.Attendances
                .FirstOrDefaultAsync(a => a.EmployeeId == employee.Id && a.Date == today);

            if (existing != null) return BadRequest("Already checked in for today.");

            var attendance = new Attendance
            {
                EmployeeId = employee.Id,
                Date = today,
                CheckInTime = DateTime.UtcNow, // Now this works because model is DateTime
                Status = AttendanceStatus.Present // Now this works because of 'using static'
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return Ok("Checked In Successfully");
        }
        #endregion

        #region Check Out
        [HttpPost("check-out")]
        public async Task<IActionResult> CheckOut()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);

            var today = DateTime.UtcNow.Date;
            var attendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.EmployeeId == employee.Id && a.Date == today);

            if (attendance == null) return BadRequest("You have not checked in yet.");
            if (attendance.CheckOutTime != null) return BadRequest("Already checked out.");

            attendance.CheckOutTime = DateTime.UtcNow;

            // Logic: Calculate hours
            var hoursWorked = (attendance.CheckOutTime.Value - attendance.CheckInTime).TotalHours;
            if (hoursWorked < 4) attendance.Status = AttendanceStatus.HalfDay;

            await _context.SaveChangesAsync();

            return Ok("Checked Out Successfully");
        }
        #endregion

        #region View My History
        [HttpGet("my-history")]
        public async Task<IActionResult> GetMyHistory()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);

            var history = await _context.Attendances
                .Where(a => a.EmployeeId == employee.Id)
                .OrderByDescending(a => a.Date)
                .ToListAsync();

            return Ok(_mapper.Map<List<AttendanceLogDto>>(history));
        }
        #endregion

        #region Get Daily Attendance (Admin View)
        [HttpGet("daily-log")]
        [Authorize(Roles = "Admin,HROfficer")]
        public async Task<IActionResult> GetDailyAttendance([FromQuery] DateTime? date)
        {
            var targetDate = date ?? DateTime.UtcNow.Date;

            var logs = await _context.Attendances
                .Include(a => a.Employee)
                .Where(a => a.Date == targetDate)
                .OrderBy(a => a.Employee.FirstName)
                .Select(a => new AttendanceLogDto // Manual map for list view
                {
                    Date = a.Date.ToString("dd MMM yyyy"),
                    CheckIn = a.CheckInTime.ToString(@"hh\:mm tt"),
                    CheckOut = a.CheckOutTime.HasValue ? a.CheckOutTime.Value.ToString(@"hh\:mm tt") : "-",
                    Status = a.Status.ToString(),
                    // Extra field just for Admin view to know WHO this is
                    WorkHours = a.Employee.FirstName + " " + a.Employee.LastName
                })
                .ToListAsync();

            return Ok(logs);
        }
        #endregion
    }
}