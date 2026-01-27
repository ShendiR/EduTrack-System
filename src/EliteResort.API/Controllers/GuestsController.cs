using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GuestsController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Guest>>> GetGuests()
        {
            return await _context.Guests.ToListAsync();
        }

       
        [HttpPost]
        public async Task<ActionResult<Guest>> PostGuest(Guest guest)
        {
            _context.Guests.Add(guest);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGuests), new { id = guest.Id }, guest);
        }

        [HttpDelete("{Id}")] 
        public async Task<IActionResult> DeleteGuest(int Id)
        {
            var guest = await _context.Guests.FindAsync(Id);
            if (guest == null) return NotFound();

            _context.Guests.Remove(guest);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}