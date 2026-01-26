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
            // Përdorim .Include që të marrim edhe të dhënat e Guest dhe Room nga tabelat e tjera
            return await _context.Bookings
                .Include(b => b.Guest)
                .Include(b => b.Room)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            // 1. Kontrollojmë nëse dhoma ekziston
            var room = await _context.Rooms.FindAsync(booking.RoomId);
            if (room == null) return NotFound("Room not found.");

            // 2. Sigurohemi që dhoma është e lirë
            if (!room.IsAvailable) return BadRequest("This room is already occupied.");

            // 3. Llogaritja e ditëve (të paktën 1 ditë)
            int days = (booking.CheckOutDate - booking.CheckInDate).Days;
            if (days <= 0) days = 1;

            // 4. Llogaritja e çmimit automatikisht
            booking.TotalPrice = days * room.PricePerNight;

            // 5. Ndryshimi i statusit të dhomës në 'Jo e lirë'
            room.IsAvailable = false;

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