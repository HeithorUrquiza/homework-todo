'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckCheck, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";

var itens = [
  {id: 1, desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English"},
  {id: 2, desc: "Abobrinha"},
]

export default function Home() {
  const [editingItemId, setEditingItemId] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [newItemValue, setNewItemValue] = useState("");
  // const [items, setItems] = useState(itens);

  const handleEditClick = (itemId: number) => {
    const item = itens.find((item) => item.id === itemId);
    if (item) {
      setEditingItemId(itemId);
      setInputValue(item.desc);
    }
  }

  const handleRemoveClick = (itemId: number) => {
    const updatedItems = itens.filter((item) => item.id !== itemId);
    itens = updatedItems;
  };

  const handleNewItemChange = (event: any) => {
    setNewItemValue(event.target.value);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  const handleSaveClick = () => {
    // Atualize o item na lista com o novo valor do input
    const updatedItens = itens.map((item) => {
      if (item.id === editingItemId) {
        return { ...item, desc: inputValue };
      }
      return item;
    });

    // Limpe o estado de edição
    setEditingItemId(0);
    setInputValue("");

    itens = updatedItens
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newItem = {
      id: itens.length + 1,
      desc: newItemValue,
    }
    // Adicione o novo item à lista
    itens.push(newItem);
    // Limpe o valor do campo de entrada
    setNewItemValue("");
  }
 
  return (
    <div className="flex min-h-screen bg-slate-100 justify-center py-3">
      <Card className="w-[460px] h-auto shadow-lg grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader className="text-center mb-8">
          <CardTitle>HOMEWORK - TODO</CardTitle>
          <CardDescription>Listagem de tarefas domésticas</CardDescription>
        </CardHeader>
        <CardContent>
        <ul>
          {itens.map(item =>
            <li key={item.id}>
            <div className="flex item-center justify-between ml-8 my-3">
              <div className="flex item-center space-x-2">
                <Checkbox id="terms1"/>
                {editingItemId === item.id ? (
                  <>
                    <Input className="h-5" value={inputValue} onChange={handleInputChange} />
                  </>
                ) : (
                  <Label className="text-xs w-fit" >{item.desc}</Label>
                )}
              </div>
              <div className="flex item-center space-x-2 mr-8">
                {editingItemId === item.id ? (
                  <Button onClick={handleSaveClick} variant="outline" size="icon" className="h-5 w-5 ml-3">
                    <CheckCheck className="h-4 w-4"></CheckCheck>
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => handleEditClick(item.id)} variant="outline" size="icon" className="h-5 w-5 ml-3">
                      <Pencil className="h-4 w-4"></Pencil>
                    </Button>
                    <Button onClick={() => handleRemoveClick(item.id)} variant="outline" size="icon" className="h-5 w-5">
                      <Trash2 className="h-4 w-4"></Trash2>
                    </Button>
                  </>
                )}
              </div>
            </div>
            </li>
          )}          
        </ul>
        </CardContent>
        <CardFooter>
          <form className="w-full flex gap-2" onSubmit={handleSubmit}>
            <Input placeholder="Digite uma tarefa" value={newItemValue} onChange={handleNewItemChange}/>
            <Button type="submit">Criar</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
