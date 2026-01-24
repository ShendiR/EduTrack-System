using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class MenuItem
    {
        [Key] public int Id { get; set; }
        [Required] public string Name { get; set; }
        public string Description { get; set; }
        [Required] public decimal Price { get; set; }
    }
}