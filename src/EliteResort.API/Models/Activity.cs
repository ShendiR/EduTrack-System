using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EliteResort.API.Models
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        public int MaxParticipants { get; set; }

        public bool IsAvailable { get; set; } = true;

        [JsonIgnore]
        public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();
    }
}