// Models/Task.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace TeamTasksAPI.Models
{
    public class Task
    {
        [Key]
        public int TaskId { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [MaxLength(250)]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public int AssigneeId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Open"; // Ej: Open, In Progress, Completed, Blocked
        [Required]
        [MaxLength(50)]
        public string Priority { get; set; } = "Medium"; // Ej: Low, Medium, High, Critical
        public int EstimatedComplexity { get; set; } // Ej: 1-5, 1-10, etc.
        public DateTime? DueDate { get; set; }

    public DateTime? CompletionDate { get; set; } 
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Propiedades de navegación
        [ForeignKey("ProjectId")]
        public Project Project { get; set; } = default!;
        [ForeignKey("AssigneeId")]
        public Developer Assignee { get; set; } = default!;
    }
}