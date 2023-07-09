
import React,{ useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
// import ToDo from "../ToDo/ToDo";
import { addToDo, getToDoList ,updateToDo,deleteToDo,createToDoList,getAllLists} from "../../utils/HandleApi";
import AllLists from '../WelcomePage/WelcomePage';
import ToDoList from '../ToDo/ToDoList';
import { getAllListsRedux } from '../../Redux/Slices/AllListsSlice';

const Home = ({lists,ReduxList,user}) => {
    console.log("user",user._id);
    const user_id=user._id;
    const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllListsRedux(user_id));
  },[])
    

    
      return (
        <div className="Home mx-auto w-[80vw] sm:w-[full]">
        {ReduxList?<ToDoList ReduxList={ReduxList} user={user}/>:lists?<AllLists lists={lists}/>:<></>}
        </div>
      );
}

export default Home;



