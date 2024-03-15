export async function fetchTotalExpenses() {
    const response = await fetch("/api/Expenses/total");
    const data = await response.json();
    console.log(data)
    return data
}

export async function fetchAllExpenses() {
    const response = await fetch("/api/Expenses");
    const data = await response.json();
    console.log(data)
    return data
}
