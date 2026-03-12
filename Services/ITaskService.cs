// Services/ITaskService.cs
using TeamTasksAPI.Models;
using TeamTasksAPI.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TeamTasksAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Models.Task>> GetProjectTasksAsync(int projectId, string? status, int? assigneeId, int page, int pageSize);
        Task<Models.Task?> GetTaskByIdAsync(int taskId);
        Task<Models.Task> CreateTaskAsync(TaskCreateDto taskDto);
        Task<bool> UpdateTaskStatusAsync(int taskId, TaskStatusUpdateDto dto);
        
    }
}