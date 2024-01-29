import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new-expense")({
  component: NewExpensePage,
});

function NewExpensePage() {
  const navigate = useNavigate({ from: "/new-expense" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/all-expenses" });
  };

  return (
    <>
      <h1 className="text-2xl">New Expense</h1>

      <form className="flex flex-col gap-y-10" onSubmit={handleSubmit}>
        <Label>
          Title
          <Input
          // value={}
          // onChange={}
          />
        </Label>

        <Label>
          Amount
          <Input type="number" />
        </Label>

        <Button type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
