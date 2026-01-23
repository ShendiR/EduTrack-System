using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Code { get; set; } 

        [Required]
        public decimal Percentage { get; set; }
    }
}