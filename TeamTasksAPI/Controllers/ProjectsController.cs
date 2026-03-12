using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasksAPI.Data;
using TeamTasksAPI.Models; 

namespace TeamTasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1️⃣ GET /api/projects
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _context.Projects
                .Select(p => new
                {
                    p.ProjectId,
                    p.Name,
                    p.ClientName,
                    p.Status,
                    TotalTasks = p.Tasks.Count,
                    OpenTasks = p.Tasks.Count(t => t.Status != "Completed"),
                    CompletedTasks = p.Tasks.Count(t => t.Status == "Completed")
                })
                .ToListAsync();

            return Ok(projects);
        }

        // 2️⃣ GET /api/projects/{id}/tasks
        [HttpGet("{id}/tasks")]
        public async Task<IActionResult> GetProjectTasks(
            int id,
            [FromQuery] string? status,
            [FromQuery] int? assigneeId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var query = _context.Tasks
                .Where(t => t.ProjectId == id);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            if (assigneeId.HasValue)
                query = query.Where(t => t.AssigneeId == assigneeId);

            var tasks = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(t => t.Assignee) 
                .ToListAsync();

            return Ok(tasks);
        }
    }
}