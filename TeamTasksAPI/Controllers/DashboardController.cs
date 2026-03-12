using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasksAPI.Data;
using TeamTasksAPI.Models; 
namespace TeamTasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 3️⃣ GET /api/dashboard/developer-workload
        [HttpGet("developer-workload")]
        public async Task<IActionResult> GetDeveloperWorkload()
        {
            var workload = await _context.Developers
                .Where(d => d.IsActive)
                .Select(d => new
                {
                    DeveloperName = d.FirstName + " " + d.LastName,
                    OpenTasksCount = d.Tasks.Count(t => t.Status != "Completed"),
                    AverageEstimatedComplexity = d.Tasks
                        .Where(t => t.Status != "Completed")
                        .Average(t => (double?)t.EstimatedComplexity) ?? 0
                })
                .ToListAsync();

            return Ok(workload);
        }

        // 4️⃣ GET /api/dashboard/project-health
        [HttpGet("project-health")]
        public async Task<IActionResult> GetProjectHealth()
        {
            var health = await _context.Projects
                .Select(p => new
                {
                    p.Name,
                    p.ClientName,
                    TotalTasks = p.Tasks.Count,
                    OpenTasks = p.Tasks.Count(t => t.Status != "Completed"),
                    CompletedTasks = p.Tasks.Count(t => t.Status == "Completed")
                })
                .ToListAsync();

            return Ok(health);
        }

         // 5️⃣ GET /api/dashboard/developer-delay-risk
        [HttpGet("developer-delay-risk")]
        public async Task<IActionResult> GetDeveloperDelayRisk()
        {
            var delayRisk = await _context.Developers
                .Where(d => d.IsActive)
                .Select(d => new
                {
                    DeveloperName = d.FirstName + " " + d.LastName,
                    OverdueTasksCount = d.Tasks.Count(t => t.Status != "Completed" && t.DueDate.HasValue && t.DueDate < DateTime.Today),
                    AverageDelayDays = d.Tasks
                        .Where(t => t.Status == "Completed" && t.DueDate.HasValue && t.CompletionDate.HasValue && t.DueDate < t.CompletionDate)
                        .Average(t => (double?)(t.CompletionDate.Value - t.DueDate.Value).TotalDays) ?? 0
                })
                .ToListAsync();

            return Ok(delayRisk);
        }
    }
}