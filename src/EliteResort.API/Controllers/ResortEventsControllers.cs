using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResortEventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResortEventsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResortEvent>>> GetEvents()
        {
            return await _context.ResortEvents.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResortEvent>> GetEvent(int id)
        {
            var resortEvent = await _context.ResortEvents.FindAsync(id);

            if (resortEvent == null)
            {
                return NotFound();
            }

            return resortEvent;
        }

        [HttpPost]
        public async Task<ActionResult<ResortEvent>> PostEvent(ResortEvent ev)
        {
            _context.ResortEvents.Add(ev);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = ev.Id }, ev);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, ResortEvent ev)
        {
            if (id != ev.Id)
            {
                return BadRequest();
            }

            _context.Entry(ev).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var ev = await _context.ResortEvents.FindAsync(id);
            if (ev == null)
            {
                return NotFound();
            }

            _context.ResortEvents.Remove(ev);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.ResortEvents.Any(e => e.Id == id);
        }
    }
}