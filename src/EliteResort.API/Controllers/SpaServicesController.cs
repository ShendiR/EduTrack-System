using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpaServicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SpaServicesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/SpaServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpaService>>> GetSpaServices()
        {
            return await _context.SpaServices.ToListAsync();
        }

        // POST: api/SpaServices
        [HttpPost]
        public async Task<ActionResult<SpaService>> PostSpaService(SpaService spaService)
        {
            _context.SpaServices.Add(spaService);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSpaServices), new { id = spaService.Id }, spaService);
        }

        // DELETE: api/SpaServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpaService(int id)
        {
            var spaService = await _context.SpaServices.FindAsync(id);
            if (spaService == null) return NotFound();

            _context.SpaServices.Remove(spaService);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
