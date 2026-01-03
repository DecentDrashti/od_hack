namespace Human_Resource_Management_System.DTOs
{
    public class MarkAttendanceDto
    {
        // No input needed, system takes Current Time & User ID from Token
    }

    public class AttendanceLogDto
    {
        public string Date { get; set; } = string.Empty;       // "22 Oct 2025"
        public string CheckIn { get; set; } = string.Empty;    // "10:00 AM"
        public string CheckOut { get; set; } = string.Empty;   // "07:00 PM"
        public string WorkHours { get; set; } = string.Empty;  // "09:00"
        public string Status { get; set; } = string.Empty;     // Present/Absent
    }
}