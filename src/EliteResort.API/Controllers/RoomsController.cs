using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoomsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            // .Include eshte i detyrueshem qe te mos dali "Standard" fiks
            return await _context.Rooms
                .Include(r => r.RoomType)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            var result = await _context.Rooms
                .Include(r => r.RoomType)
                .FirstOrDefaultAsync(r => r.Id == room.Id);

            return CreatedAtAction(nameof(GetRooms), new { id = room.Id }, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null) return NotFound();

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}