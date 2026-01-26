using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Amenity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } // Psh: "WiFi", "AC", "Pool View"
        public string Description { get; set; }
    }
}