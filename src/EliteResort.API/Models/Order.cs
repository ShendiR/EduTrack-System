using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int TableId { get; set; }
        public DateTime OrderTime { get; set; } = DateTime.Now;
        public decimal TotalAmount { get; set; }
    }
}