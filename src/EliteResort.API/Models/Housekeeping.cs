using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Housekeeping
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RoomId { get; set; }
        public string Status { get; set; }
        public string StaffName { get; set; }
        public DateTime LastCleaned { get; set; } = DateTime.Now;
    }
}