// Models/DTOs/TaskStatusUpdateDto.cs
using System.ComponentModel.DataAnnotations;

namespace TeamTasksAPI.Models.DTOs
{
    public class TaskStatusUpdateDto
    {
        [Required]
        [StringLength(50)]
        public string Status { get; set; } = string.Empty;
        [StringLength(50)]
        public string? Priority { get; set; }
        [Range(1, 10)]
        public int? EstimatedComplexity { get; set; }
    }
}