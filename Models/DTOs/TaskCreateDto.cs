// Models/DTOs/TaskCreateDto.cs
using System.ComponentModel.DataAnnotations;
using System;

namespace TeamTasksAPI.Models.DTOs
{
    public class TaskCreateDto
    {
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [StringLength(250, MinimumLength = 5)]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public int AssigneeId { get; set; }
        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Open";
        [Required]
        [StringLength(50)]
        public string Priority { get; set; } = "Medium";
        [Range(1, 10)] // Ejemplo de rango para complejidad
        public int EstimatedComplexity { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
    }
}