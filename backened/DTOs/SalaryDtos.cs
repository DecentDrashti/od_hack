namespace Human_Resource_Management_System.DTOs
{
    // Input: Admin enters just the wage
    public class SetSalaryDto
    {
        public int EmployeeId { get; set; }
        public decimal MonthlyWage { get; set; }
    }

    // Output: Detailed Slip
    public class SalarySlipDto
    {
        public int EmployeeId { get; set; }
        public decimal MonthlyWage { get; set; }
        public decimal YearlyWage { get; set; }

        // Breakdown (Calculated)
        public decimal BasicSalary { get; set; }       // 50%
        public decimal HRA { get; set; }               // 50% of Basic
        public decimal StandardAllowance { get; set; }
        public decimal SpecialAllowance { get; set; }
        public decimal PF { get; set; }                // Deduction
        public decimal ProfessionalTax { get; set; }   // Deduction

        public decimal NetSalary { get; set; }
    }
}