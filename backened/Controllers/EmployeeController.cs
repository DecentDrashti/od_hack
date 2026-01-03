using AutoMapper;
using Human_Resource_Management_System.Data;
using Human_Resource_Management_System.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Human_Resource_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [Route("api/[controller]")]
        [ApiController]
        [Authorize]
        public class EmployeeController : ControllerBase
        {
            private readonly ApplicationDbContext _context;
            private readonly IMapper _mapper;

            public EmployeeController(ApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            #region Get All Employees (Admin Dashboard)
            [HttpGet]
            [Authorize(Roles = "Admin,HROfficer")]
            public async Task<IActionResult> GetAllEmployees()
            {
                var employees = await _context.Employees
                    .Include(e => e.User) // Include User to get LoginID/Role
                    .Include(e => e.Manager)
                    .ToListAsync();

                var dtos = _mapper.Map<List<EmployeeProfileDto>>(employees);
                return Ok(dtos);
            }
            #endregion

            #region Get My Profile
            [HttpGet("me")]
            public async Task<IActionResult> GetMyProfile()
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var employee = await _context.Employees
                    .Include(e => e.User)
                    .Include(e => e.Manager)
                    .FirstOrDefaultAsync(e => e.UserId == userId);

                if (employee == null) return NotFound();

                return Ok(_mapper.Map<EmployeeProfileDto>(employee));
            }
            #endregion

            #region Get Specific Profile (Admin)
            [HttpGet("{id}")]
            [Authorize(Roles = "Admin,HROfficer")]
            public async Task<IActionResult> GetEmployeeById(int id)
            {
                var employee = await _context.Employees
                    .Include(e => e.User)
                    .Include(e => e.Manager)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (employee == null) return NotFound();

                return Ok(_mapper.Map<EmployeeProfileDto>(employee));
            }
            #endregion

            #region Update My Profile (Limited Access)
            [HttpPut("me")]
            public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileDto dto)
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);

                if (employee == null) return NotFound();

                // Employees can ONLY update these fields
                if (!string.IsNullOrEmpty(dto.Phone)) employee.Phone = dto.Phone;
                if (!string.IsNullOrEmpty(dto.Address)) employee.Address = dto.Address;
                if (!string.IsNullOrEmpty(dto.ProfilePictureUrl)) employee.ProfilePictureUrl = dto.ProfilePictureUrl;

                await _context.SaveChangesAsync();
                return Ok("Profile updated successfully.");
            }
            #endregion
        }
    }
}
