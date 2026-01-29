using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Staff
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty; // p.sh. Recepsionist, Manager, Housekeeping

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        [Required]
        public decimal Salary { get; set; }

        public DateTime HireDate { get; set; } = DateTime.Now;

        public bool IsActive { get; set; } = true;
    }
}