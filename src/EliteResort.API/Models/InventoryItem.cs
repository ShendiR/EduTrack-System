using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class InventoryItem
    {
        [Key] public int Id { get; set; }
        [Required] public string ItemName { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; } // Psh: Kg, Litra, Cope
    }
}