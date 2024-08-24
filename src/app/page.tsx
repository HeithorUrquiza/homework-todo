'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckCheck, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { createHomework, deleteHomework, getAllHomeworks, updateHomework, updateStatusHomework } from "./utils/api";
import Homework from "./types";

export default function Home() {
  const [itemId, setItemId] = useState(0);
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  
  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const homeworks: Homework[] = await getAllHomeworks();
        setHomeworkList(homeworks)
      }
      catch (error){
        console.error(error)
      }
    }
    fetchHomeworks();
  }, []);

  const handleCreateItem = async () => {
    try {
      const newHomework: Homework = await createHomework(description);
      console.log(`Item created: ${newHomework}`);
      setDescription('');
    }
    catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const handleRemoveItem = async (id: number) => {
    await deleteHomework(id);
    setHomeworkList(homeworkList.filter(homework => homework.id !== id));
  }

  const handleUpdateItem = async (id: number, description: string) => {
    try {
      const updatedHomework: Homework = await updateHomework(id, description);
      setHomeworkList(homeworkList.map(homework => {
        if (homework.id === id) {
          if (description.trim() !== '') {
            return { ...updatedHomework, description: newDescription};
          }
        }
        return homework;
      }))
      setItemId(0);
      setNewDescription('');
    }
    catch (error) {
      console.error(`Error: ${error}`);
    } 
  }

  const handleUpdateStatusHomework = async (id: number, isChecked: boolean) => {
    try {
      const updatedHomework: Homework = await updateStatusHomework(id, !isChecked);
      setHomeworkList(homeworkList.map(homework => {
        if (homework.id === id) {
          return { ...updatedHomework, isChecked: !isChecked };
        }
        return homework;
      }))
    } 
    catch (error) {
      console.error();
    }
  }

  const handleEditClick = (id: number) => {
    const homework = homeworkList.find(homework => homework.id === id);
    if (homework) {
      setItemId(homework.id);
      setNewDescription(homework.description);
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
          {homeworkList.map(homework =>
            <li key={homework.id}>
              <div className="flex item-center justify-between ml-8 my-3">
                <div className="flex item-center space-x-2">
                  <Checkbox 
                    id={`check-${homework.id}`} 
                    checked={homework.isChecked} 
                    onClick={() => handleUpdateStatusHomework(Number(homework.id), homework.isChecked)}/>
                  {itemId === Number(homework.id) ? (
                    <>
                      <Input 
                        className="h-5" 
                        value={newDescription} 
                        onChange={e => setNewDescription(e.target.value)}/>
                    </>
                  ) : (
                    <Label className="text-xs w-fit" >{homework.description}</Label>
                  )}
                </div>
                <div className="flex item-center space-x-2 mr-8">
                  {itemId === Number(homework.id) ? (
                    <Button 
                      onClick={() => handleUpdateItem(Number(homework.id), newDescription)} 
                      variant="outline" 
                      size="icon" 
                      className="h-5 w-5 ml-3">
                      <CheckCheck className="h-4 w-4"></CheckCheck>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={() => handleEditClick(Number(homework.id))} 
                        variant="outline" 
                        size="icon" 
                        className="h-5 w-5 ml-3">
                        <Pencil className="h-4 w-4"></Pencil>
                      </Button>
                      <Button 
                        onClick={() => handleRemoveItem(Number(homework.id))} 
                        variant="outline" 
                        size="icon" 
                        className="h-5 w-5">
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
            <Input 
              placeholder="Digite uma tarefa" 
              value={description} 
              onChange={e => setDescription(e.target.value)}/>
            <Button type="submit">Criar</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
