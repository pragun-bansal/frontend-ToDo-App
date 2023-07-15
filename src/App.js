import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Home from './components/Home/Home';
import {addToDo, getToDoList, updateToDo, deleteToDo, getAllLists} from './utils/HandleApi';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import LoginPage from './components/Login/LoginPage';
  import axios from 'axios';

//Redux Imports
import store from "./Redux/Store/store";

import {Provider,useSelector} from "react-redux";
import { getUserRedux, logoutUser } from './Redux/Slices/UserSlice';


function App() {

const dispatch = useDispatch();

useEffect(() => {
  // setLists
  // dispatch(getUserRedux());
  
}, []);
// const {user,setUser}=useState()
const {data:user}= useSelector((state)=>state.User);
// const user ={
//   "_id": "64a920102fb96fc6a2407bad",
//   "name": "Pragun Bansal",
//   "email": "pragun.bansal2803@gmail.com",
//   "pfp": "https://lh3.googleusercontent.com/a/AAcHTtdi7nJOChqpH-dsNZJ4mRcQc97OZDytqSqLg8x9Fsss_raJ=s96-c",
//   "hash": "e02bf7e17112a240db49c6e561a7e281cde909b942a50d736d2c3feddea5105a6ca4520a3e852cdd0f4de8f7017900c45a6750f34cc8afa7440413cd1ea18a65",
//   "salt": "ea0c6a2ba64cb3233d00b1ab1ddb223ad723f8b6ff403ebe2ed7cf06db710561",
//   "todolists": [
//     {
//       "$oid": "64a920102fb96fc6a2407bab"
//     },
//     {
//       "$oid": "64a92fe99106ee17fc907abc"
//     },
//     {
//       "$oid": "64aa909d7e97a9d1b9d610d5"
//     }
//   ],
//   "__v": 1
// }
const {data:lists} = useSelector((state)=>state.allLists);
const {data} = useSelector((state)=>state.currentToDoList)
const ReduxList=data;


const logout=()=>{
  dispatch(logoutUser());
  window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`,"_self")
}

  // console.log(!user); 
  return (

    <Router>
      {user && lists?<Sidebar logout={logout} user={user} lists={lists} ReduxList={ReduxList} />:<></>}
      <Routes>
        <Route path="/" element={user ? <Home lists={lists} ReduxList={ReduxList} user={user}/>:<Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" />:<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
