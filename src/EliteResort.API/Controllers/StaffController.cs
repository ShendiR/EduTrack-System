using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StaffController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Staff
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaff()
        {
            return await _context.Staff.ToListAsync();
        }

        // POST: api/Staff
        [HttpPost]
        public async Task<ActionResult<Staff>> PostStaff(Staff staffMember)
        {
            _context.Staff.Add(staffMember);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStaff), new { id = staffMember.Id }, staffMember);
        }

        // PUT: api/Staff/5 (Për të përditësuar rrogat ose rolet)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(int id, Staff staffMember)
        {
            if (id != staffMember.Id) return BadRequest();
            _context.Entry(staffMember).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Staff/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staffMember = await _context.Staff.FindAsync(id);
            if (staffMember == null) return NotFound();
            _context.Staff.Remove(staffMember);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}