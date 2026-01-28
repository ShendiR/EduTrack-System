using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EliteResort.API.Models
{
    public class SpaService
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } // p.sh. "Full Body Massage"

        public string? Description { get; set; }

        [Required]
        [Range(0.01, 5000.00)]
        public decimal Price { get; set; }

        [Required]
        public int DurationMinutes { get; set; } // Sa zgjat shërbimi

        public bool IsActive { get; set; } = true;

        // Nëse do ta lidhësh me rezervimet në të ardhmen
        [JsonIgnore]
        public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();
    }
}