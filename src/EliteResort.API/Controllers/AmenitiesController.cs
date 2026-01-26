using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmenitiesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AmenitiesController(AppDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Amenity>>> GetAmenities() => await _context.Amenities.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Amenity>> PostAmenity(Amenity amenity)
        {
            _context.Amenities.Add(amenity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAmenities), new { id = amenity.Id }, amenity);
        }
    }
}