using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EliteResort.API.Data;
using EliteResort.API.Models;

namespace EliteResort.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RoomReviewsController(AppDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomReview>>> GetReviews() => await _context.RoomReviews.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<RoomReview>> PostReview(RoomReview review)
        {
            _context.RoomReviews.Add(review);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReviews), new { id = review.Id }, review);
        }
    }
}