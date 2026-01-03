using Microsoft.EntityFrameworkCore;
using Human_Resource_Management_System.Models; // Ensure this namespace matches your project

namespace Human_Resource_Management_System.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // --- 1. Register All Tables ---
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        // Payroll
        public DbSet<EmployeeSalary> EmployeeSalaries { get; set; }
        public DbSet<SalaryComponent> SalaryComponents { get; set; }

        // Leaves (Assuming these classes are inside Leave.cs)
        public DbSet<LeaveTypes> LeaveTypes { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<LeaveAllocation> LeaveAllocations { get; set; }

        // Audit
        public DbSet<ApprovalLog> ApprovalLogs { get; set; }

        // --- 2. Configure Relationships & Rules ---
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // A. User <-> Employee (1-to-1)
            // When User is deleted, the Employee profile is also deleted
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne(u => u.Employee)
                .HasForeignKey<Employee>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // B. Employee <-> Salary (1-to-1)
            modelBuilder.Entity<EmployeeSalary>()
                .HasOne(es => es.Employee)
                .WithOne(e => e.SalaryDetails)
                .HasForeignKey<EmployeeSalary>(es => es.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);

            // C. Employee Manager (Self-Referencing)
            // Prevent deleting a Manager if they have employees assigned
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Manager)
                .WithMany()
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            // D. Salary Components (1-to-Many)
            modelBuilder.Entity<SalaryComponent>()
                .HasOne(sc => sc.EmployeeSalary)
                .WithMany(es => es.Components)
                .HasForeignKey(sc => sc.EmployeeSalaryId)
                .OnDelete(DeleteBehavior.Cascade);

            // E. Leave Relationships
            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.LeaveType)
                .WithMany()
                .HasForeignKey(lr => lr.LeaveTypeId)
                .OnDelete(DeleteBehavior.Restrict); // Don't delete history if Type is deleted

            modelBuilder.Entity<LeaveAllocation>()
                .HasOne(la => la.LeaveType)
                .WithMany()
                .HasForeignKey(la => la.LeaveTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            // F. Unique Login ID
            modelBuilder.Entity<User>()
                .HasIndex(u => u.LoginId)
                .IsUnique();

            // G. Decimal Precision (Fixes warnings for Money fields)
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?)))
            {
                property.SetColumnType("decimal(18,2)");
            }
        }
    }
}