using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentRentalsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EquipmentRentalsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipmentRental>>> GetEquipment()
        {
            return await _context.EquipmentRentals.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<EquipmentRental>> PostEquipment(EquipmentRental equipment)
        {
            _context.EquipmentRentals.Add(equipment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEquipment), new { id = equipment.Id }, equipment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEquipment(int id, EquipmentRental equipment)
        {
            if (id != equipment.Id) return BadRequest();
            _context.Entry(equipment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            var equipment = await _context.EquipmentRentals.FindAsync(id);
            if (equipment == null) return NotFound();
            _context.EquipmentRentals.Remove(equipment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}