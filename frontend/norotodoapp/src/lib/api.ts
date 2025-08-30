const API = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async () => fetch(`${API}/api/tasks`).then(res => res.json());

export const createTask = async (task: {title: string; color: string; completed?: boolean}) => {
    console.log('API URL:', API);
    console.log('Send to', `${API}/api/tasks`);
    console.log('payload:', task);
    
    const response = await fetch(`${API}/api/tasks`, { 
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(task)
    });
    
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    return response.json();
};

export const updateTask = async (id: number, updates: Partial<{title: string; color: string; completed: boolean}>) =>
    fetch(`${API}/api/tasks/${id}`, { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(updates)}).then(res => res.json());

export const deleteTask = async (id: number) =>
    fetch(`${API}/api/tasks/${id}`, { method: "DELETE" }).then(res => res.json());
