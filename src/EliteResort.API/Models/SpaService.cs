using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class SpaService
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int DurationMinutes { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
