import axios from 'axios'

const baseUrl = "http://localhost:5005"

const getAllToDo = (setToDo)=>{
    axios.get(baseUrl)
    .then(({data})=>{
        console.log('data--->',data);
        setToDo(data)
    })
}

const addToDo=(text,setText,setToDo)=>{
    axios.post(`${baseUrl}/save`,{text})
    .then((data)=>{
        console.log(data);
        setText("");
        getAllToDo(setToDo)
    })
    .catch((err)=>console.log(err))
}

const updateToDo=(text,setText,setToDo,setIsUpdating,toDoId)=>{
    axios.post(`${baseUrl}/update`,{_id:toDoId ,text})
    .then((data)=>{
        setIsUpdating(false);
        setText("");
        getAllToDo(setToDo);
        console.log(data);
    })
    .catch((err)=>console.log(err))
}

const deleteToDo=(_id,setToDo)=>{
    console.log(_id)
    axios.post(`${baseUrl}/delete`,{_id})
    .then((data)=>{
        console.log(data);
        getAllToDo(setToDo)
    })
    .catch((err)=>console.log(err))
}

export {getAllToDo,addToDo,updateToDo,deleteToDo}