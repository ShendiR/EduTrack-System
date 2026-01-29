using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EliteResort.API.Models
{
    public class ServiceBooking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int GuestId { get; set; }

        [Required]
        public string ServiceType { get; set; } = string.Empty; // p.sh. "Spa", "Activity", "Rental"

        [Required]
        public string ServiceName { get; set; } = string.Empty; // p.sh. "Massage", "Hiking"

        [Required]
        public DateTime BookingDate { get; set; } = DateTime.Now;

        [Required]
        public decimal TotalPrice { get; set; }

        public string Status { get; set; } = "Confirmed"; // Confirmed, Pending, Cancelled

        [ForeignKey("GuestId")]
        [JsonIgnore]
        public virtual Guest? Guest { get; set; }
    }
}