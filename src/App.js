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
import { getUserRedux } from './Redux/Slices/UserSlice';


function App() {

const dispatch = useDispatch();

useEffect(() => {
  // setLists
  dispatch(getUserRedux());
  
}, []);

const {data:user}= useSelector((state)=>state.User);
const {data:lists} = useSelector((state)=>state.allLists);
const {data} = useSelector((state)=>state.currentToDoList)
const ReduxList=data;


const logout=()=>{
  window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`,"_self")
}

  console.log(!user);
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
