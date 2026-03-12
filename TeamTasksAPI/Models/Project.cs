// Models/Project.cs
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TeamTasksAPI.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(200)]
        public string ClientName { get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Ej: Active, Completed, On Hold

        // Propiedad de navegación
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}