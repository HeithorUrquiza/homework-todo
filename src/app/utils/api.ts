export async function updateHomework(id: number, isChecked: boolean) {
    try {
        const response = await fetch(`/api/homeworks/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isChecked }),
            cache: 'no-store'
        });
  
        if (!response.ok) {
            throw new Error('Erro ao atualizar a tarefa.');
        }
  
        const updatedHomework = await response.json();
        return updatedHomework;
    } catch (error) {
        console.error(error);
    }
}
  