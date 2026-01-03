namespace Human_Resource_Management_System.DTOs
{
    public class EmployeeProfileDto
    {
        public int Id { get; set; }
        public string LoginId { get; set; } = string.Empty; // From User Table
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public DateTime JoiningDate { get; set; }
        public string? ManagerName { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }

    public class UpdateProfileDto
    {
        // Employees can only edit these fields
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}