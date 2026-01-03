using System.ComponentModel.DataAnnotations;

namespace Human_Resource_Management_System.Models
{
    public class ApprovalLog
    {
        [Key]
        public int Id { get; set; } // Changed from Guid to int

        public string EntityType { get; set; } = string.Empty;

        public int EntityId { get; set; } // CHANGED: Guid -> int (to match LeaveRequest Id)

        public string Action { get; set; } = string.Empty;

        public int ActionBy { get; set; } // CHANGED: Guid -> int (to match User Id)

        public DateTime ActionDate { get; set; } = DateTime.UtcNow;

        public string? Comment { get; set; }
    }
}