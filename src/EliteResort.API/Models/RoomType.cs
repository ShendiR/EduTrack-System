using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class RoomType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } // Psh: "Standard", "Deluxe", "Suite"
        public string Description { get; set; }
        public decimal BasePrice { get; set; }
    }
}