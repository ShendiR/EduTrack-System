using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class RestaurantTable
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int TableNumber { get; set; }
        public int Capacity { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}