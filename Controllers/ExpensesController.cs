using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Models;

namespace ExpenseTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly DatabaseContext _context;

    public ExpensesController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Expense>>> GetExpenseItems()
    {
        return await _context.Expenses.ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Expense>> GetExpenseItem(int id)
    {
        return new Expense { Id = id, Title = "fake expense" };
    }

    [HttpGet("total")]
    public async Task<IActionResult> GetTotalExpenses()
    {
        var total = 1234;
        return Ok(new { total });
    }
}