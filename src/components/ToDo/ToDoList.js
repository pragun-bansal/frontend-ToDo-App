import React from 'react';
import {BiEdit} from 'react-icons/bi'
import { useEffect, useState } from "react";
import { getToDoList,addTask,updateTask,deleteTask,toggleCheckTask,createToDoList,getAllLists,deleteToDoList,updateListName} from "../../utils/HandleApi";
import ToDoCard from './ToDoCard';
import{useDispatch} from "react-redux"
import { getCurrentList, newList } from '../../Redux/Slices/ToDoSlice';
import { Navigate } from 'react-router-dom';
import { getAllListsRedux } from '../../Redux/Slices/AllListsSlice';
// import { getAllListsRedux } from '../../Redux/Slices/AllListsSlice';
const ToDoList = ({ReduxList,user}) => {

    const [toDo, setToDo] = useState([]);
const [text, setText] = useState('');
const [newListName, setNewListName] = useState('');
const [isUpdating, setIsUpdating] = useState(false);
const [isUpdatingListName, setIsUpdatingListName] = useState(false);
const [taskUpdated, setTaskUpdated] = useState('');

const updateMode = (_id, text) => {
  setIsUpdating(true);
  setText(text);
  setTaskUpdated(_id);
};

const updateName=()=>{
  setIsUpdatingListName((prevIsUpdatingListName) => !prevIsUpdatingListName);
};
const dispatch = useDispatch();
const handleSubmit=(e)=>{
  // e.preventDefault();
  updateListName(ReduxList._id,newListName);
  dispatch(getAllListsRedux(user._id));
  dispatch(getCurrentList(ReduxList._id));
  getCurrentList(ReduxList._id);
  updateName();
}



  return (
    <div>
      <div className="App ">
        <div className="container mx-auto my-auto max-w-[600px]  px-0 py-[1rem] ">
        <form className={isUpdatingListName?`border p-[10px] `:`hidden`}>
          <input type="text" placeholder="check" className=' w-[80%] h-[32px]' value={newListName} onChange={(e) => setNewListName(e.target.value)}></input>
          <button type="button" onClick={()=>handleSubmit()} >Change</button>
          </form>
        <div className={isUpdatingListName?`hidden`:`flex mx-auto`}>
          <h1 className="text-center text-[32px] mx-auto font-bold"> {ReduxList.todo.name}</h1>
          <BiEdit className="icon cursor-pointer text-[20px]" onClick={updateName} />
          </div>
          <div className="top my-[1rem] flex justify-center gap-[1rem] text-center">
            <input
              type="text"
              placeholder="Add ToDo...."
              className="w-[400px] border-0 border-b-[1px] border-solid border-black py-[0.5rem]  outline-0"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div
              className="add cursor-pointer bg-black px-[0.5rem] py-[1.5rem] text-white"
              onClick={
                isUpdating
                  ? async () => {await updateTask(taskUpdated,text,setText,setToDo,setIsUpdating);setTimeout(async () => {
                    await dispatch(getCurrentList(ReduxList._id));
                  }, 300);
                }
                  : async() =>{await  addTask(ReduxList._id,text, setText);setTimeout(async () => {
                    await dispatch(getCurrentList(ReduxList._id));
                  }, 300);
                }
              }>
              {isUpdating ? 'Update' : 'Add'}
            </div>
          </div>
          <div className="list"></div>
          {ReduxList.list?.map(item => {
            return (
              <ToDoCard
                key={item._id}
                text={item.text}
                checked={item.checked}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={async () => {
                  await deleteTask(item._id, ReduxList._id);
                  setTimeout(async () => {
                    await dispatch(getCurrentList(ReduxList._id));
                  }, 300);
                }}

                toggleCheck={async()=>{await toggleCheckTask(item._id);
                  setTimeout(async () => {
                    await dispatch(getCurrentList(ReduxList._id));
                  }, 300);
                } }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;