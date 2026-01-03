using System.ComponentModel.DataAnnotations;

namespace Human_Resource_Management_System.Models
{
    public class LeaveTypes
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!; // "Paid", "Sick"
        public int MaxDaysPerYear { get; set; }
    }

    public class LeaveAllocation
    {
        [Key]
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;

        public int LeaveTypeId { get; set; }
        public LeaveTypes LeaveType { get; set; } = null!;

        public int TotalAllocated { get; set; }
        public int Used { get; set; }
    }

    public class LeaveRequest
    {
        [Key]
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;

        public int LeaveTypeId { get; set; }
        public LeaveTypes LeaveType { get; set; } = null!;

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string? AttachmentUrl { get; set; } // For documents

        public string AdminRemarks { get; set; } = string.Empty;

        public Enums.LeaveRequestStatus Status { get; set; }
    }
}