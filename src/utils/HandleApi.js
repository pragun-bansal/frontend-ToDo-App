import axios from 'axios'
import mongoose from "mongoose"
import { getCurrentList } from '../Redux/Slices/ToDoSlice'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}`



const createToDoList = (name,user_id)=>{
    axios.post(`${baseUrl}/createToDoList`,{name:name,user_id:user_id})
    .then(({data})=>{
        console.log('data--->',data);
    })
}

const deleteToDoList = (user_id,toDoListId)=>{
    axios.post(`${baseUrl}/deleteToDoList`,{toDoListId:toDoListId,user_id:user_id})
    .then(({data})=>{
        console.log('data--->',data);
        // setToDo(data)
    })
}

const updateListName = (toDoListId,text)=>{
    axios.put(`${baseUrl}/updateListName`,{toDoListId:toDoListId,text:text})
    .then(({data})=>{
        console.log('data--->',data);
    })
}

const getAllLists = async(user_id,setLists)=>{
    await axios.post(`${baseUrl}/getAllLists`,{user_id:user_id})
    .then(({data})=>{
        setLists(data);
        
    })
}


// const getAllLists = async (setLists, user_id) => {
//     console.log("checking", user_id);
//     try {
//       const response = await fetch(`${baseUrl}/getAllLists`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_id: user_id }),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log("data--->", data);
//         setLists(data);
//       } else {
//         throw new Error("Failed to retrieve lists");
//       }
//     } catch (error) {
//       console.log("Error retrieving lists:", error.message);
//     }
//   };
  
  


const getToDoList = (toDoListId,setToDo)=>{
    axios.post(`${baseUrl}/getToDoList`,{toDoListId:toDoListId})
    .then(({data})=>{
        console.log('data--->',data);
        setToDo(data);
    })
}

// const getToDoList = (toDoListId) => {
//     axios.post(`${baseUrl}/getToDoList`, { toDoListId })
//       .then(({ data }) => {
//         console.log('data--->', data);
//         // setToDo(data)
//       })
//       .catch((error) => {
//         console.log('Error:', error);
//       });
//   };
  





const addTask=(toDoId,text,setText)=>{
    axios.post(`${baseUrl}/saveTask`,{text:text,toDoId:toDoId})
    .then((data)=>{
        console.log(data);
        setText("");
    })
    .catch((err)=>console.log(err))
}

const updateTask=(itemId,text,setText,setToDo,setIsUpdating)=>{

    axios.post(`${baseUrl}/updateTask`,{_id:itemId,text})
    .then((data)=>{
        setIsUpdating(false);
        setText("");
        console.log(data);
    })
    .catch((err)=>console.log(err))
}

const toggleCheckTask=(itemId)=>{
    axios.put(`${baseUrl}/toggleCheckTask`,{_id:itemId})
    .then((data)=>{
        // setIsUpdating(false);
        // setText("");
        // getToDoList(toDoId,setToDo);
        console.log(data);
    })
    .catch((err)=>console.log(err))
}

const deleteTask=(itemId,toDoId)=>{
    console.log(itemId,toDoId)
    axios.post(`${baseUrl}/deleteTask`,{_id:itemId,toDoId:toDoId})
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>console.log(err))
}

export {getToDoList,addTask,updateTask,deleteTask,toggleCheckTask,createToDoList,getAllLists,deleteToDoList,updateListName}