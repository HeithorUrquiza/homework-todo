import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>HOMEWORK - TODO</CardTitle>
          <CardDescription>Listagem de tarefas domésticas</CardDescription>
        </CardHeader>
        <CardContent>
        <Checkbox id="terms1" />
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </CardContent>
        <CardFooter>
          form
        </CardFooter>
      </Card>
    </div>
  );
}
