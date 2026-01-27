using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EliteResort.API.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string RoomNumber { get; set; }

        [Required]
        public decimal PricePerNight { get; set; }

        public bool IsAvailable { get; set; } = true;

        
        [Required]
        public int RoomTypeId { get; set; }

        [ForeignKey("RoomTypeId")]
        public virtual RoomType? RoomType { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();
    }
}