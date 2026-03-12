// Models/Developer.cs
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TeamTasksAPI.Models
{
    public class Developer
    {
        [Key]
        public int DeveloperId { get; set; }
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;

        // Propiedad de navegación
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}