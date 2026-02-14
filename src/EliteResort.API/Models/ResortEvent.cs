using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EliteResort.API.Models
{
    public class ResortEvent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Titulli është i detyrueshëm")]
        [StringLength(200)]
        public string Title { get; set; } // Psh: Dasma e Filanit

        [Required]
        public DateTime EventDate { get; set; } = DateTime.Now;

        [Required]
        [StringLength(100)]
        public string Location { get; set; } // Psh: Salla A
    }
}