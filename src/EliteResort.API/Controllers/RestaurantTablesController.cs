using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantTablesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RestaurantTablesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestaurantTable>>> GetTables()
        {
            return await _context.RestaurantTables.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantTable>> GetTable(int id)
        {
            var table = await _context.RestaurantTables.FindAsync(id);
            if (table == null) return NotFound();
            return table;
        }

        [HttpPost]
        public async Task<ActionResult<RestaurantTable>> PostTable(RestaurantTable table)
        {
            _context.RestaurantTables.Add(table);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTables), new { id = table.Id }, table);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(int id)
        {
            var table = await _context.RestaurantTables.FindAsync(id);
            if (table == null) return NotFound();
            _context.RestaurantTables.Remove(table);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}