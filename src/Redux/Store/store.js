import { configureStore } from "@reduxjs/toolkit";
import allLists from "../Slices/AllListsSlice";
import currentToDoList from "../Slices/ToDoSlice"
import User from "../Slices/UserSlice"

const  store = configureStore({
    reducer:{
        currentToDoList : currentToDoList,
        User:User,
        allLists:allLists,
    },
})

export default store