// Controllers/TasksController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamTasksAPI.Data;
using TeamTasksAPI.Models;
using TeamTasksAPI.Models.DTOs;
using System.Linq;
using System.Threading.Tasks;

namespace TeamTasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Método auxiliar para CreatedAtAction en POST /api/tasks
        [HttpGet("{id}", Name = "GetTask")]
        public async Task<ActionResult<Models.Task>> GetTask(int id)
        {
            var task = await _context.Tasks
                                    .Include(t => t.Project)
                                    .Include(t => t.Assignee)
                                    .FirstOrDefaultAsync(t => t.TaskId == id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // 6️⃣ POST /api/tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto taskDto)
        {
            // Validar que el proyecto existe
            if (!await _context.Projects.AnyAsync(p => p.ProjectId == taskDto.ProjectId))
                return BadRequest("El proyecto no existe.");

            // Validar que el desarrollador existe
            if (!await _context.Developers.AnyAsync(d => d.DeveloperId == taskDto.AssigneeId))
                return BadRequest("El desarrollador no existe.");

            var task = new Models.Task 
            {
                ProjectId = taskDto.ProjectId,
                Title = taskDto.Title,
                Description = taskDto.Description,
                AssigneeId = taskDto.AssigneeId,
                Status = taskDto.Status,
                Priority = taskDto.Priority,
                EstimatedComplexity = taskDto.EstimatedComplexity,
                DueDate = taskDto.DueDate,
                CreatedDate = DateTime.UtcNow // Establece la fecha de creación automáticamente
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Devuelve 201 Created con la URI de la nueva tarea
            return CreatedAtAction(nameof(GetTask), new { id = task.TaskId }, task);
        }

      
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] TaskStatusUpdateDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.Status = dto.Status;
            if (dto.Priority != null) task.Priority = dto.Priority;
            if (dto.EstimatedComplexity.HasValue) task.EstimatedComplexity = dto.EstimatedComplexity.Value;

            await _context.SaveChangesAsync();
            return Ok(task);
        }
    }
}