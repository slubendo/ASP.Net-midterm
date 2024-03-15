  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  // import { formatCurrency } from "@/lib/utils";
  import { fetchTotalExpenses } from "@/network";
  import { useQuery } from "@tanstack/react-query";
  import { createFileRoute } from "@tanstack/react-router";

  export const Route = createFileRoute("/")({
    component: HomePage,
  });

  function HomePage() {
    // Get this from the api

    const { isPending, error, data } = useQuery({ queryKey: ['getTotal'], queryFn: fetchTotalExpenses })
    console.log(data)
    // const totalSpent = formatCurrency(4321);


    return (
      <>
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: try again later</p>
        ) : (
          <Card className="w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-sm">Total Spent:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.total}</div>
            </CardContent>
          </Card>
        )}
      </>
    );
  }
