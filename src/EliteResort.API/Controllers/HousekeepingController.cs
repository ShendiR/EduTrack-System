using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HousekeepingController : ControllerBase
    {
        private readonly AppDbContext _context;
        public HousekeepingController(AppDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Housekeeping>>> GetHousekeepings() => await _context.Housekeepings.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Housekeeping>> PostHousekeeping(Housekeeping item)
        {
            _context.Housekeepings.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHousekeepings), new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHousekeeping(int id)
        {
            var item = await _context.Housekeepings.FindAsync(id);
            if (item == null) return NotFound();
            _context.Housekeepings.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}