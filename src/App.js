import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo ,updateToDo,deleteToDo} from "./utils/HandleApi";

function App() {

const [toDo,setToDo] = useState([]);
const [text,setText] = useState("");
const [isUpdating, setIsUpdating]=useState(false)
const [toDoId,setToDoId]=useState("")

const updateMode=(_id,text)=>{
  setIsUpdating(true);
  setText(text);
  setToDoId(_id);
}


useEffect(()=>{
  getAllToDo(setToDo)
},[])

console.log(toDo);

  return (
    <div className="App">
      <div className="container mx-auto my-auto px-0 py-[1rem] max-w-[600px] ">
        <h1 className="text-[32px] font-bold text-center"> To Do App</h1>
      

      <div className="top flex my-[1rem] text-center justify-center gap-[1rem]">
        <input type="text" 
        placeholder="Add ToDo...." 
        className="border-0 w-[400px] py-[0.5rem] outline-0 border-b-[1px] border-black  border-solid" 
        value ={text} 
        onChange = {(e)=>setText(e.target.value)}
        />
      <div 
      className="add bg-black text-white px-[0.5rem] py-[1.5rem] cursor-pointer" 
      onClick={isUpdating?
      ()=>updateToDo(text,setText,setToDo,setIsUpdating,toDoId) :
      ()=>addToDo(text,setText,setToDo)}
      >{isUpdating?"Update":"Add"}</div>

      </div>
    <div className="list">
    {toDo?.map((item)=>{
      return (
        <ToDo 
        key={item._id} 
        text = {item.text} 
        updateMode = {()=>updateMode(item._id,item.text)}
        deleteToDo={()=>deleteToDo(item._id,setToDo)}
        />
      )
    })}
    </div>
    </div>
    </div>
  );
}

export default App;
