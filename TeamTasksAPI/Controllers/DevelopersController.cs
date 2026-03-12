// Controllers/DevelopersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasksAPI.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TeamTasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevelopersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DevelopersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Opcional: GET /api/developers
        [HttpGet]
        public async Task<IActionResult> GetDevelopers()
        {
            var developers = await _context.Developers
                .Where(d => d.IsActive)
                .Select(d => new
                {
                    d.DeveloperId,
                    FullName = d.FirstName + " " + d.LastName,
                    d.Email
                })
                .ToListAsync();

            return Ok(developers);
        }
    }
}