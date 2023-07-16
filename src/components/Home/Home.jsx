
import React,{ useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
// import ToDo from "../ToDo/ToDo";
import { addToDo, getToDoList ,updateToDo,deleteToDo,createToDoList,getAllLists} from "../../utils/HandleApi";
import AllLists from '../WelcomePage/WelcomePage';
import ToDoList from '../ToDo/ToDoList';
import { getAllListsRedux } from '../../Redux/Slices/AllListsSlice';
import { useCookies } from "react-cookie";


const Home = ({lists,ReduxList,user}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const token = cookies.access_token
  // console.log(token);
  // console.log("user",user._id);
  const user_id=user._id;
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("useeffect",token)
    // setTimeout(async()=>await dispatch(getAllListsRedux(user_id,token)),1000

    dispatch(getAllListsRedux({user_id,token}))
   
  },[])
    

    
      return (
        <div className="Home mx-auto w-[80vw] sm:w-[full]">
        {ReduxList?<ToDoList ReduxList={ReduxList} user={user}/>:lists?<AllLists user={user} lists={lists}/>:<></>}
        </div>
      );
}

export default Home;



