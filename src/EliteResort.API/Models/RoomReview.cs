using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class RoomReview
    {
        [Key]
        public int Id { get; set; }
        public int RoomId { get; set; }
        public string GuestName { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}