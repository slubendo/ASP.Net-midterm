import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "@/lib/utils";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/all-expenses")({
  component: AllExpenses,
});

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Groceries",
    amount: 1000,
  },
  {
    id: 2,
    title: "Gas",
    amount: 2000,
  },
  {
    id: 3,
    title: "Rent",
    amount: 3000,
  },
];

function AllExpenses() {
  return (
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
          {fakeExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.title}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(expense.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
