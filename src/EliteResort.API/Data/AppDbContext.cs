using Microsoft.EntityFrameworkCore;
using EliteResort.API.Models;
using System.Linq;

namespace EliteResort.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<RestaurantTable> RestaurantTables { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ResortEvent> ResortEvents { get; set; }
        public DbSet<InventoryItem> Inventory { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Housekeeping> Housekeepings { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        public DbSet<RoomReview> RoomReviews { get; set; }
        public DbSet<SpaService> SpaServices { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<EquipmentRental> EquipmentRentals { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<ServiceBooking> ServiceBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Konfigurimi i Decimal
            var decimalProps = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?));

            foreach (var property in decimalProps)
            {
                property.SetColumnType("decimal(18,2)");
            }

            // Fix për lidhjen Booking-Room
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasOne(b => b.Room)
                      .WithMany()
                      .HasForeignKey(b => b.RoomId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Zhdukja e hijeve
                entity.Ignore("RoomId1");
                entity.Ignore("RoomId2");
            });
        }
    }
}