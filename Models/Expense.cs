namespace ExpenseTracker.Models;

public class Expense
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public decimal Total { get; set; }
}