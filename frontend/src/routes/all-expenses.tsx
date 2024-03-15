import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllExpenses } from "@/network";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/all-expenses")({
  component: AllExpenses,
});

type Expense = {
  id: number;
  title: string;
  total: number;
};


function AllExpenses() {

  const { isPending, error, data } = useQuery({ queryKey: ['getTotal'], queryFn: fetchAllExpenses })
  const expenses: Expense[] = data;
  console.log(data)

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: try again later</p>
      ) : (
        <>
          <h1 className="text-2xl">All Expenses</h1>
          <Table>
            <TableCaption>A list of your recent expenses.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell className="text-right">
                    {expense.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}