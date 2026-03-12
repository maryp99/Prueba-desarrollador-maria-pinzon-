// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using TeamTasksAPI.Models; 
namespace TeamTasksAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

       
        public DbSet<Project> Projects { get; set; } = default!;
        public DbSet<Models.Task> Tasks { get; set; } = default!; 
        public DbSet<Developer> Developers { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<Models.Task>()
                .HasOne(t => t.Project)
                .WithMany(p => p.Tasks)
                .HasForeignKey(t => t.ProjectId);

            // Para la relación entre Developer y Task
            modelBuilder.Entity<Models.Task>()
                .HasOne(t => t.Assignee)
                .WithMany(d => d.Tasks)
                .HasForeignKey(t => t.AssigneeId);
        }
    }
}