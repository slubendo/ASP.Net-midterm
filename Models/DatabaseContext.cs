using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Models;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options) { }

  public DbSet<Expense> Expenses => Set<Expense>();
}