using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int GuestId { get; set; }
        public Guest Guest { get; set; } 

        [Required]
        public int RoomId { get; set; }
        public Room Room { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        public string Status { get; set; } = "Pending";

        
        public decimal TotalPrice { get; set; }
    }
}