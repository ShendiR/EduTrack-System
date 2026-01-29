using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EliteResort.API.Models
{
    public class EquipmentRental
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string EquipmentName { get; set; } = string.Empty; // p.sh. "Tenis Racket", "Diving Mask"

        [Required]
        public string Category { get; set; } = string.Empty; // Tenis, Water Sports, etj.

        [Required]
        public decimal PricePerDay { get; set; }

        public int TotalQuantity { get; set; }

        public int AvailableQuantity { get; set; }

        public string Condition { get; set; } = "Good"; // New, Good, Needs Repair

        [JsonIgnore]
        public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();
    }
}