using System.ComponentModel.DataAnnotations;
using static Human_Resource_Management_System.Models.Enums; // Fixes Enum error

namespace Human_Resource_Management_System.Models
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }

        public DateTime Date { get; set; }

        // CHANGED: Use DateTime instead of TimeSpan to avoid errors
        public DateTime CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }

        public AttendanceStatus Status { get; set; }
    }
}