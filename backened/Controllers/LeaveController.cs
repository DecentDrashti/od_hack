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
    [Authorize]
    public class LeaveController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LeaveController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #region Apply for Leave
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave([FromBody] LeaveRequestDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);

            var request = new LeaveRequest
            {
                EmployeeId = employee.Id,
                LeaveTypeId = dto.LeaveTypeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Reason = dto.Reason,
                AttachmentUrl = dto.AttachmentUrl,
                Status = LeaveRequestStatus.Pending // Default status
            };

            _context.LeaveRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok("Leave request submitted successfully.");
        }
        #endregion

        #region Get My Leaves
        [HttpGet("my-leaves")]
        public async Task<IActionResult> GetMyLeaves()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);

            var leaves = await _context.LeaveRequests
                .Include(l => l.LeaveType)
                .Where(l => l.EmployeeId == employee.Id)
                .OrderByDescending(l => l.StartDate)
                .ToListAsync();

            return Ok(_mapper.Map<List<LeaveHistoryDto>>(leaves));
        }
        #endregion

        #region Approve/Reject (Admin Only)
        [Authorize(Roles = "Admin,HROfficer")]
        [HttpPost("approve")]
        public async Task<IActionResult> ApproveLeave([FromBody] LeaveActionDto dto)
        {
            var leave = await _context.LeaveRequests.FindAsync(dto.RequestId);
            if (leave == null) return NotFound("Leave request not found.");

            // Update Status
            leave.Status = dto.IsApproved ? LeaveRequestStatus.Approved : LeaveRequestStatus.Rejected;
            leave.AdminRemarks = dto.Remarks;

            // Add Audit Log
            var log = new ApprovalLog
            {
                EntityType = "Leave",
                EntityId = leave.Id,
                Action = dto.IsApproved ? "Approved" : "Rejected",
                ActionBy = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value),
                ActionDate = DateTime.UtcNow,
                Comment = dto.Remarks
            };
            _context.ApprovalLogs.Add(log);

            await _context.SaveChangesAsync();
            return Ok($"Leave request {leave.Status}.");
        }
        #endregion

        #region Get All Pending Requests (Admin View)
        [HttpGet("pending")]
        [Authorize(Roles = "Admin,HROfficer")]
        public async Task<IActionResult> GetPendingLeaves()
        {
            var leaves = await _context.LeaveRequests
                .Include(l => l.Employee)
                .Include(l => l.LeaveType)
                .Where(l => l.Status == LeaveRequestStatus.Pending) // Filter only pending
                .OrderBy(l => l.StartDate)
                .ToListAsync();

            // Create a custom anonymous object for the Admin Dashboard Table
            var response = leaves.Select(l => new
            {
                RequestId = l.Id,
                EmployeeName = $"{l.Employee.FirstName} {l.Employee.LastName}",
                Type = l.LeaveType.Name,
                From = l.StartDate.ToString("dd MMM"),
                To = l.EndDate.ToString("dd MMM"),
                Reason = l.Reason,
                Attachment = l.AttachmentUrl
            });

            return Ok(response);
        }
        #endregion
    }
}