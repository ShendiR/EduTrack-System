using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InventoryItemsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryItem>>> GetInventory()
        {
            return await _context.Inventory.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<InventoryItem>> PostInventoryItem(InventoryItem item)
        {
            _context.Inventory.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInventory), new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventoryItem(int id)
        {
            var item = await _context.Inventory.FindAsync(id);
            if (item == null) return NotFound();
            _context.Inventory.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}