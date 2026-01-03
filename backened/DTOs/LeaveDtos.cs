namespace Human_Resource_Management_System.DTOs
{
    public class LeaveRequestDto
    {
        public int LeaveTypeId { get; set; } // ID of "Paid" or "Sick"
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string? AttachmentUrl { get; set; }
    }

    public class LeaveHistoryDto
    {
        public int Id { get; set; }
        public string TypeName { get; set; } = string.Empty; // "Sick Leave"
        public string Duration { get; set; } = string.Empty; // "12 May - 14 May"
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;   // Approved/Pending
    }

    public class LeaveActionDto
    {
        public int RequestId { get; set; }
        public bool IsApproved { get; set; } // True = Approve, False = Reject
        public string? Remarks { get; set; }
    }
}