using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Human_Resource_Management_System.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; } // Links to User Table
        public User User { get; set; } = null!;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;

        // Simplified Department (No separate table needed)
        public string Department { get; set; } = string.Empty;

        public string JobTitle { get; set; } = string.Empty;
        public DateTime JoiningDate { get; set; }

        // Self-Referencing Manager (Optional)
        public int? ManagerId { get; set; }
        public Employee? Manager { get; set; }

        // Navigations
        public EmployeeSalary? SalaryDetails { get; set; }
        public ICollection<LeaveAllocation> LeaveAllocations { get; set; } = new List<LeaveAllocation>();
        public ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
    }
}