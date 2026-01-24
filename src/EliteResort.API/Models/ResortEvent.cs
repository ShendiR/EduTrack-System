using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class ResortEvent
    {
        [Key] public int Id { get; set; }
        [Required] public string Title { get; set; } // Psh: Dasma e Filanit
        public DateTime EventDate { get; set; }
        public string Location { get; set; } // Psh: Salla A
    }
}