using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string RoomNumber { get; set; }
        public string Type { get; set; } 
        public decimal PricePerNight { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}
