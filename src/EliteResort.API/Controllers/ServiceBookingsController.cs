using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceBookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceBookingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceBooking>>> GetServiceBookings()
        {
            return await _context.ServiceBookings.Include(s => s.Guest).ToListAsync();
        }

        // POST: api/ServiceBookings
        [HttpPost]
        public async Task<ActionResult<ServiceBooking>> PostServiceBooking(ServiceBooking booking)
        {
            _context.ServiceBookings.Add(booking);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetServiceBookings), new { id = booking.Id }, booking);
        }

        // DELETE: api/ServiceBookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceBooking(int id)
        {
            var booking = await _context.ServiceBookings.FindAsync(id);
            if (booking == null) return NotFound();

            _context.ServiceBookings.Remove(booking);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}