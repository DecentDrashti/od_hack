using System.ComponentModel.DataAnnotations;
using static Human_Resource_Management_System.Models.Enums;

namespace Human_Resource_Management_System.DTOs
{
    public class RegisterDto
    {
        [Required] public string FirstName { get; set; } = string.Empty;
        [Required] public string LastName { get; set; } = string.Empty;
        [Required, EmailAddress] public string Email { get; set; } = string.Empty;
        [Required] public string Password { get; set; } = string.Empty;
        [Required] public string Phone { get; set; } = string.Empty;
        [Required] public DateTime JoiningDate { get; set; }

        // Admin assigns these
        public string JobTitle { get; set; } = "Developer";
        public string Department { get; set; } = "IT";
        public UserRole Role { get; set; } = UserRole.Employee;
    }

    public class LoginDto
    {
        [Required] public string EmailOrId { get; set; } = string.Empty; // Supports "OIJODO..." OR Email
        [Required] public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string LoginId { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? ProfilePictureUrl { get; set; }
    }
}