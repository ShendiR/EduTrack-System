using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings
                .Include(b => b.Guest)
                .Include(b => b.Room)
                .OrderByDescending(b => b.CheckInDate) 
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            // 1. Validimi i datave - Fillimisht shohim nëse datat kanë sens
            if (booking.CheckInDate < DateTime.Now.Date)
                return BadRequest("Data e hyrjes nuk mund të jetë në të kaluarën.");

            if (booking.CheckOutDate <= booking.CheckInDate)
                return BadRequest("Data e daljes duhet të jetë pas datës së hyrjes.");

            // 2. Kontrollojmë nëse dhoma ekziston
            var room = await _context.Rooms.FindAsync(booking.RoomId);
            if (room == null) return NotFound("Room not found.");

            // 3. Kontrollojmë mbivendosjen e rezervimeve në databazë
            bool isOccupied = await _context.Bookings.AnyAsync(b =>
                b.RoomId == booking.RoomId &&
                ((booking.CheckInDate >= b.CheckInDate && booking.CheckInDate < b.CheckOutDate) ||
                 (booking.CheckOutDate > b.CheckInDate && booking.CheckOutDate <= b.CheckOutDate)));

            if (isOccupied) return BadRequest("Kjo dhomë është e rezervuar për këto data.");

            // 4. Llogaritja e ditëve dhe çmimit
            int days = (booking.CheckOutDate - booking.CheckInDate).Days;
            if (days <= 0) days = 1;
            booking.TotalPrice = days * room.PricePerNight;

            // 5. Ruajtja
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookings), new { id = booking.Id }, booking);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return NotFound();

            // RREGULLIMI: Kur fshihet rezervimi, dhoma bëhet përsëri "Available"
            var room = await _context.Rooms.FindAsync(booking.RoomId);
            if (room != null)
            {
                room.IsAvailable = true;
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}