using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BookingId { get; set; } 

        [Required]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.Now;

        [Required]
        public string PaymentMethod { get; set; } 

        public string Status { get; set; } = "Completed";
    }
}