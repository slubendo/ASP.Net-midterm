import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";



export const Route = createFileRoute("/new-expense")({
  component: NewExpensePage,
});

const ExpsenseType = z.object({
  title: z.string().min(3).max(100),
  total: z.number().min(0).max(1000),
});
type ExpsenseType = z.infer<typeof ExpsenseType>;

function NewExpensePage() {
  const form = useForm({
    defaultValues: {
      title: "",
      total: 0,
    },
    onSubmit: async ({ value }) => {
      // wait
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await mutateAsync(value);
      navigate({ to: "/all-expenses" });
    },
    validatorAdapter: zodValidator,
  });

  const navigate = useNavigate({ from: "/new-expense" });

  const { error, isPending, mutateAsync } = useMutation({
    mutationKey: ["postTotal"],
    mutationFn: async ({ title, total }: ExpsenseType) => {
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


    return (
      <>
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: try again later</p>
        ) : (
          <>
            <h1 className="text-2xl">New Expense</h1>
            <form.Provider>
              <form className="flex flex-col gap-y-10" onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}>
                <form.Field
                  name="title"
                  validators={{
                    onChange: ExpsenseType.shape.title,
                  }}
                  children={(field) => (
                    <>
                      <Label className="block mb-2">Title</Label>
                      <Input
                        className="border border-gray-400 rounded px-2 py-1 mb-4"
                        type="text"
                        placeholder="Type"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors && (
                        <em role="alert">{field.state.meta.errors.join(", ")}</em>
                      )}
                    </>
                  )}
                />

                <form.Field
                  name="total"
                  validators={{
                    onChange: ExpsenseType.shape.total,
                  }}
                  children={(field) => (
                    <>
                      <Label className="block mb-2">total</Label>
                      <Input
                        className="border border-gray-400 rounded px-2 py-1 mb-4"
                        type="text"
                        placeholder="Type"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(parseInt(e.target.value))}
                      />
                      {field.state.meta.errors && (
                        <em role="alert">{field.state.meta.errors.join(", ")}</em>
                      )}
                    </>
                  )}
                />


              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "..." : "Submit"}
                  </Button>
                )}
              ></form.Subscribe>
            </form>
          </form.Provider>
        </>
      )}
    </>
  );
}  