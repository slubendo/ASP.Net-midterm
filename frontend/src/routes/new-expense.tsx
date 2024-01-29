import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";



export const Route = createFileRoute("/new-expense")({
  component: NewExpensePage,
});

type Expense = {
  id: number;
  title: string;
  total: number;
};

function NewExpensePage() {
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState(0);

  const navigate = useNavigate({ from: "/new-expense" });

  const { error, isPending, mutateAsync } = useMutation({
    mutationKey: ["postTotal"],
    mutationFn: async ({ title, total }: Expense) => {
      const response = await fetch("/api/Expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, total }),
      });
      return response.json();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({
        id: 0,
        title: title,
        total: total,
      });
      // Reset form fields after successful submission
      setTitle("");
      setTotal(0);
      navigate({ to: "/all-expenses" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: try again later</p>
      ) : (
        <>
          <h1 className="text-2xl">New Expense</h1>

          <form className="flex flex-col gap-y-10" onSubmit={handleSubmit}>
            <Label>
              Title
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Label>

            <Label>
              Amount
              <Input type="number" value={total} onChange={(e) => setTotal(parseInt(e.target.value))} />
            </Label>

            <Button type="submit">
              Submit
            </Button>
          </form>
        </>
      )}
    </>
  );
}  