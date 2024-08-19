// import { Trash } from "@/components/icons/trash";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const itens = [
  {id: 1, desc: "Limpar a casa"},
  {id: 2, desc: "Arrumar o quarto"},
  {id: 1, desc: "Levar o cachorro para passear"},
]

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100 justify-center">
      <Card className="w-[460px] h-[100vh] shadow-lg grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader className="text-center mb-8">
          <CardTitle>HOMEWORK - TODO</CardTitle>
          <CardDescription>Listagem de tarefas domésticas</CardDescription>
        </CardHeader>
        <CardContent>
        {itens.map(item =>
          <div key={item.id} className="flex item-center justify-between ml-8 my-2">
            <div className="flex item-center space-x-2">
              <Checkbox id="terms1"/>
              <Label className="text-xs">{item.desc}</Label>
            </div>
            <div className="flex item-center space-x-2 mr-8">
              <Button variant="outline" size="icon" className="h-5 w-5 ml-3">
                <Pencil className="h-4 w-4"></Pencil>
              </Button>
              <Button variant="outline" size="icon" className="h-5 w-5">
                <Trash2 className="h-4 w-4"></Trash2>
              </Button>
            </div>
          </div>
        )}          
        </CardContent>
        <CardFooter className="space-x-2">
          <Input placeholder="Digite uma tarefa" />
          <Button type="submit">Criar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
