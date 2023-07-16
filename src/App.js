import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Home from './components/Home/Home';
import {addToDo, getToDoList, updateToDo, deleteToDo, getAllLists} from './utils/HandleApi';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import LoginPage from './components/Login/LoginPage';
import {Provider,useSelector} from "react-redux";
import { getUserRedux, loginUser, logoutUser } from './Redux/Slices/UserSlice';
import { emptyCurrentList } from './Redux/Slices/ToDoSlice';
import { ToastContainer } from 'react-toastify';


function App() {

const dispatch = useDispatch();

useEffect(() => {
  const data=localStorage.getItem("user");
  if(data && data._id){
    console.log(JSON.parse(data));
    dispatch(loginUser((JSON.parse(data))));}
  
}, []);
// const {user,setUser}=useState()
const {data:user}= useSelector((state)=>state.User);
if(user){ 
  // console.log(user);
  localStorage.setItem("user",JSON.stringify(user));}

const {data:lists} = useSelector((state)=>state.allLists);
const {data} = useSelector((state)=>state.currentToDoList)
const ReduxList=data;

const logout=()=>{
  localStorage.clear();
  dispatch(logoutUser());
  window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`,"_self")
}


  return (
    <Router>
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    {user && lists?<Sidebar logout={logout} user={user} lists={lists} ReduxList={ReduxList} />:<></>}
    <Routes>
      <Route path="/" element={user ? <Home lists={lists} ReduxList={ReduxList} user={user}/>:<Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" />:<LoginPage />} />
    </Routes>
  </Router>
  );
}

export default App;
