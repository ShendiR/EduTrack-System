using System.ComponentModel.DataAnnotations;

namespace EliteResort.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        // Kjo fushë të duhet ty dhe Drinit për testimin e login-it direkt
        [Required]
        public string Password { get; set; } = string.Empty;

        // Këto do t'i përdorë Jozefi më vonë për sigurinë e lartë
        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }

        public string Role { get; set; } = "Admin";
    }
}