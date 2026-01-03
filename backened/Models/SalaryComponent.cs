using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Human_Resource_Management_System.Models.Enums;

namespace Human_Resource_Management_System.Models
{
    public class SalaryComponent
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("EmployeeSalary")]
        public int EmployeeSalaryId { get; set; }
        public EmployeeSalary EmployeeSalary { get; set; } = null!;

        [Required]
        public string Name { get; set; } = null!; // Basic, HRA

        public SalaryCalculationType CalculationType { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Value { get; set; }        // 50.00 (Percent) or 5000 (Fixed)

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }       // The calculated result

        public bool IsDeduction { get; set; }
    }
}   