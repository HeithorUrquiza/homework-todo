'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckCheck, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { createTodo, getAll, deleteTodo, updateTodo } from "@/actions";

interface homework {
  id: number,
  description: string
}

export default function Home() {
  const [itemId, setItemId] = useState(0);
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [items, setItems] = useState<homework[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getAll();
        setItems(items);
      }
      catch (error){
        console.error(`Error: ${error}`)
      }
    }

    fetchItems()
  }, []);

  const handleCreateItem = async () => {
    try {
      const item = await createTodo(description);
      console.log(`Item created: ${item}`);
      setDescription('');
    }
    catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const handleRemoveItem = async (id: number) => {
    await deleteTodo(id);
    setItems(items.filter(item => item.id !== id));
  }

  const handleUpdateItem = async (id: number, desc: string) => {
    try {
      const updatedItem = await updateTodo(id, desc);
      setItems(items.map(item => {
        if (item.id === id) {
          return { ...updatedItem, description: newDescription};
        }
        return item;
      }))
      console.log(`Item updated`);
    }
    catch (error) {
      console.error(`Error: ${error}`);
    } 
    finally {
      setItemId(0);
      setNewDescription('');
    }
  }

  const handleEditClick = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setItemId(item.id);
      setNewDescription(item.description);
    }
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
          {items.map(item =>
            <li key={item.id}>
            <div className="flex item-center justify-between ml-8 my-3">
              <div className="flex item-center space-x-2">
                <Checkbox id="terms1"/>
                {itemId === Number(item.id) ? (
                  <>
                    <Input className="h-5" value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
                  </>
                ) : (
                  <Label className="text-xs w-fit" >{item.description}</Label>
                )}
              </div>
              <div className="flex item-center space-x-2 mr-8">
                {itemId === Number(item.id) ? (
                  <Button onClick={() => handleUpdateItem(Number(item.id), newDescription)} variant="outline" size="icon" className="h-5 w-5 ml-3">
                    <CheckCheck className="h-4 w-4"></CheckCheck>
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => handleEditClick(Number(item.id))} variant="outline" size="icon" className="h-5 w-5 ml-3">
                      <Pencil className="h-4 w-4"></Pencil>
                    </Button>
                    <Button onClick={() => handleRemoveItem(Number(item.id))} variant="outline" size="icon" className="h-5 w-5">
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
          <form className="w-full flex gap-2" onSubmit={handleCreateItem}>
            <Input placeholder="Digite uma tarefa" value={description} onChange={e => setDescription(e.target.value)}/>
            <Button type="submit">Criar</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
