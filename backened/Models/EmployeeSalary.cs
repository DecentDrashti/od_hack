using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Human_Resource_Management_System.Models
{
    public class EmployeeSalary
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;

        [Column(TypeName = "decimal(18,2)")]
        public decimal MonthlyWage { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal YearlyWage { get; set; } // Helper field

        // Navigations
        public ICollection<SalaryComponent> Components { get; set; } = new List<SalaryComponent>();
    }
}