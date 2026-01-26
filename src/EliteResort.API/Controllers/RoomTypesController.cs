using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RoomTypesController(AppDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomType>>> GetRoomTypes() => await _context.RoomTypes.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<RoomType>> PostRoomType(RoomType type)
        {
            _context.RoomTypes.Add(type);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRoomTypes), new { id = type.Id }, type);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var type = await _context.RoomTypes.FindAsync(id);
            if (type == null) return NotFound();
            _context.RoomTypes.Remove(type);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}