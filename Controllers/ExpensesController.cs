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


    [HttpPost]
    public async Task<ActionResult<Expense>> PostExpenseItem(Expense expense)
    {
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetExpenseItem), new { id = expense.Id }, expense);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutExpenseItem(int id, Expense Expense)
    {
        if (id != Expense.Id)
        {
            return BadRequest();
        }

        _context.Entry(Expense).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpenseItem(int id)
    {
        var expenseItem = await _context.Expenses.FindAsync(id);
        if (expenseItem == null)
        {
            return NotFound();
        }

        _context.Expenses.Remove(expenseItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}