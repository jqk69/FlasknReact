import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"


const API_URL="http://localhost:5000/items"

function App() {
  const [items,setItems] = useState([])
  const [input,setInput]=useState('')

  useEffect(()=>{
    axios.get(API_URL).then(res=>setItems(res.data))
  },[])

  const addItem=()=>{
    axios.post(API_URL,{name:input}).then(()=>{
      setItems([...items,{name:input}])
      setInput('')
    })}
  
    const updateItem = (id) => {
      const newName = prompt("Enter new name");
      if (!newName) return;
    
      axios.put(`${API_URL}/${id}`, { name: newName }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(() => {
        axios.get(API_URL).then(res => {
          setItems(res.data); // Always reflects the latest backend data
        });
      }).catch((err) => console.error(err));
    };

  const deleteItem=(id)=>{
    axios.delete(`${API_URL}/${id}`,{headers: {
      'Content-Type': 'application/json'  // Explicitly setting Content-Type
    }}).then(()=>{axios.get(API_URL).then(res => {
          setItems(res.data); // Always reflects the latest backend data
        });}).catch((error) => {
      console.error("Error updating item:", error);  // Log any errors
    })
  }

  

  return (
    <>
      <div style={{ padding: 20 }}>
      <h1>CRUD with Flask + React</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item, id) => (
          <li key={id}>
            {item.name}
            <button onClick={() => updateItem(id)}>Edit</button>
            <button onClick={() => deleteItem(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
