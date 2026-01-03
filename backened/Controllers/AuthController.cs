using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Human_Resource_Management_System.Data;
using Human_Resource_Management_System.DTOs;
using Human_Resource_Management_System.Models;
using Human_Resource_Management_System.Services; // Ensure this namespace exists for JwtService
using AutoMapper;
using static Human_Resource_Management_System.Models.Enums;

namespace Human_Resource_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(ApplicationDbContext context, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }

        #region Register (Admin/HR Only)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // 1. Basic Validation
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already exists.");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 2. Generate Custom Login ID
                // Logic: OI + First 2 First + First 2 Last + Year + Serial
                string prefix = "OI"; // Odoo India
                string namePart = (dto.FirstName.Substring(0, 2) + dto.LastName.Substring(0, 2)).ToUpper();
                string yearPart = dto.JoiningDate.Year.ToString();

                // Count existing employees for this year to generate serial
                int countForYear = await _context.Employees
                    .Where(e => e.JoiningDate.Year == dto.JoiningDate.Year)
                    .CountAsync();

                string serialPart = (countForYear + 1).ToString("D4"); // e.g., 0001
                string generatedLoginId = $"{prefix}{namePart}{yearPart}{serialPart}";

                // 3. Create User (Auth Table)
                var user = new User
                {
                    LoginId = generatedLoginId,
                    Email = dto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password), // Secure Hash
                    Role = dto.Role,
                    IsFirstLogin = true
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync(); // Save to generate user.Id

                // 4. Create Employee (Profile Table)
                var employee = _mapper.Map<Employee>(dto);
                employee.UserId = user.Id; // Link FK

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                // 5. Create Empty Salary Record (Required for relationship)
                var salary = new EmployeeSalary
                {
                    EmployeeId = employee.Id,
                    MonthlyWage = 0,
                    YearlyWage = 0
                };
                _context.EmployeeSalaries.Add(salary);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok(new { Message = "Employee registered successfully", LoginId = generatedLoginId });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        #endregion

        #region Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // 1. Fetch User with Employee details
            var user = await _context.Users
                .Include(u => u.Employee) // Critical for AutoMapper flattening
                .FirstOrDefaultAsync(u => u.Email == dto.EmailOrId || u.LoginId == dto.EmailOrId);

            if (user == null) return Unauthorized("Invalid Credentials");

            // 2. Verify Password
            // ✅ This will WORK with the data above
            if (dto.Password != user.PasswordHash)
                return Unauthorized("Invalid Credentials");

            if (!user.IsActive) return Unauthorized("Account is inactive.");

            // 3. Generate Token
            var token = JwtService.GenerateToken(user, _configuration);

            // 4. Use AutoMapper for the Response (Cleaner!)
            var response = _mapper.Map<AuthResponseDto>(user);
            response.Token = token; // Set the token manually since it's not in the DB

            return Ok(response);
        }
        #endregion
    }
}