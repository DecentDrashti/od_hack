using System.ComponentModel.DataAnnotations;
using static Human_Resource_Management_System.Models.Enums;

namespace Human_Resource_Management_System.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string LoginId { get; set; } = null!;   // e.g., OIJODO20250001

        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;

        public UserRole Role { get; set; }

        public bool IsFirstLogin { get; set; } = true;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public Employee? Employee { get; set; }
    }
}