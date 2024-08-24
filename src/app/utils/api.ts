export async function getAllHomeworks() {
    try {
        const response = await fetch('/api/homeworks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });
        
        if(!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const { homeworks } = await response.json();
        return homeworks;
    } 
    catch (error) {
        console.log(error);
    }
}

export async function createHomework(description: string) {
    try {
        const response = await fetch('/api/homeworks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error(`${await response.json()}`)
        }

        const { newHomework } = await response.json();
        return newHomework;
    }
    catch(error) {
        console.error(error);
    }
}

export async function deleteHomework(id: number) {
    try {
        const response = await fetch(`/api/homeworks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error(`${await response.json()}`)
        }
    }
    catch(error) {
        console.error(error);
    }
}

export async function updateHomework(id: number, description: string) {
    try {
        const response = await fetch(`/api/homeworks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
            cache: 'no-store'
        });
  
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }
  
        const { updatedHomework } = await response.json();
        return updatedHomework;
    } catch (error) {
        console.error(error);
    }
}

export async function updateStatusHomework(id: number, isChecked: boolean) {
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
            throw new Error(`${await response.json()}`);
        }
  
        const { updatedHomework } = await response.json();
        return updatedHomework;
    } catch (error) {
        console.error(error);
    }
}
  