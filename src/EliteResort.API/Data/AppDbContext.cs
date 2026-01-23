using Microsoft.EntityFrameworkCore;
using EliteResort.API.Models;

namespace EliteResort.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Ketu regjistrojm tabelat tona
        public DbSet<Guest> Guests { get; set; }

        // Ketu vazhdimi i tyre
    }
}