using Human_Resource_Management_System.Data;
using Human_Resource_Management_System.DTOs;
using Human_Resource_Management_System.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static Human_Resource_Management_System.Models.Enums;

namespace Human_Resource_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SalaryController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region Update Structure (Admin Only)
        [Authorize(Roles = "Admin")]
        [HttpPost("update-structure")]
        public async Task<IActionResult> UpdateSalary([FromBody] SetSalaryDto dto)
        {
            var salary = await _context.EmployeeSalaries
                .Include(s => s.Components)
                .FirstOrDefaultAsync(s => s.EmployeeId == dto.EmployeeId);

            if (salary == null) return NotFound("Employee salary record not found.");

            // 1. Update Base Wage
            salary.MonthlyWage = dto.MonthlyWage;
            salary.YearlyWage = dto.MonthlyWage * 12;

            // 2. Clear old components to recalculate
            _context.SalaryComponents.RemoveRange(salary.Components);

            // 3. Auto-Calculate Components
            // Logic: Basic = 50%, HRA = 50% of Basic
            decimal basic = dto.MonthlyWage * 0.50m;
            decimal hra = basic * 0.50m;
            decimal pf = basic * 0.12m; // Deduction
            decimal profTax = 200m;     // Fixed Deduction

            var components = new List<SalaryComponent>
            {
                new SalaryComponent { EmployeeSalaryId = salary.Id, Name = "Basic Salary", CalculationType = SalaryCalculationType.Percentage, Value = 50, Amount = basic, IsDeduction = false },
                new SalaryComponent { EmployeeSalaryId = salary.Id, Name = "HRA", CalculationType = SalaryCalculationType.Percentage, Value = 50, Amount = hra, IsDeduction = false },
                new SalaryComponent { EmployeeSalaryId = salary.Id, Name = "Provident Fund", CalculationType = SalaryCalculationType.Percentage, Value = 12, Amount = pf, IsDeduction = true },
                new SalaryComponent { EmployeeSalaryId = salary.Id, Name = "Professional Tax", CalculationType = SalaryCalculationType.FixedAmount, Value = 200, Amount = profTax, IsDeduction = true }
            };

            await _context.SalaryComponents.AddRangeAsync(components);
            await _context.SaveChangesAsync();

            return Ok("Salary structure updated and recalculated.");
        }
        #endregion

        #region Get My Slip
        [HttpGet("my-slip")]
        public async Task<IActionResult> GetMySlip()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == userId);

            var salary = await _context.EmployeeSalaries
                .Include(s => s.Components)
                .FirstOrDefaultAsync(s => s.EmployeeId == employee.Id);

            if (salary == null) return NotFound("Salary details not available.");

            // Create DTO manually for accurate summing
            var slip = new SalarySlipDto
            {
                EmployeeId = employee.Id,
                MonthlyWage = salary.MonthlyWage,
                YearlyWage = salary.YearlyWage,
                BasicSalary = salary.Components.FirstOrDefault(c => c.Name == "Basic Salary")?.Amount ?? 0,
                HRA = salary.Components.FirstOrDefault(c => c.Name == "HRA")?.Amount ?? 0,
                PF = salary.Components.FirstOrDefault(c => c.Name == "Provident Fund")?.Amount ?? 0,
                ProfessionalTax = salary.Components.FirstOrDefault(c => c.Name == "Professional Tax")?.Amount ?? 0
            };

            // Net Salary = Earnings - Deductions
            var earnings = salary.Components.Where(c => !c.IsDeduction).Sum(c => c.Amount);
            var deductions = salary.Components.Where(c => c.IsDeduction).Sum(c => c.Amount);
            slip.NetSalary = earnings - deductions;

            return Ok(slip);
        }
        #endregion
    }
}