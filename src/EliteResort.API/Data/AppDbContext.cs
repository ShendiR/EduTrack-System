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
        // Ketu vazhdimi i tyre
        public DbSet<SpaService> SpaServices { get; set; }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<EquipmentRental> EquipmentRentals { get; set; }

        public DbSet<Staff> Staff { get; set; }

        public DbSet<ServiceBooking> ServiceBookings { get; set; }
    }
}