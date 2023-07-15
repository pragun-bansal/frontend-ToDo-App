import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";




export const STATUSES = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
  });

//get currentList data

export const getCurrentList = createAsyncThunk( "getCurrentList",async({toDoListId,user_id,token})=>{
    // console.log("check" ,toDoListId,user_id,token)
    const response =await axios.post(`${process.env.REACT_APP_SERVER_URL}/getToDoList`,{
        toDoListId: toDoListId,
        user_id:user_id,
        token:token
    })
    try{
        // console.log(response)
        const result = {todo:response.data.todo,list:response.data.list,_id:toDoListId};
        // console.log("CurrentList",result);
        return result;
    }
    catch(err){
        console.log(err);
        // return rejectWithValue(err);
    }
})

const currentToDoList = createSlice({
    name:'ToDoList',
    initialState:{},
    reducers:{
        add(state,action){
            state.push(action.payload)

        },
        remove(state,action){
            return state.filter((item,index)=>index!=action.payload)
        },
        newList(state,action){
            state=action.payload
        }
    },
    extraReducers:(builder)=>{{
        builder
    .addCase(getCurrentList.pending,(state,action)=>{
        state.status = STATUSES.LOADING;
    })
    .addCase(getCurrentList.fulfilled,(state,action)=>{
        state.data = action.payload;
        state.status = STATUSES.IDLE;
    })
    .addCase(getCurrentList.rejected,(state,action)=>{
        state.status = STATUSES.ERROR;
    })
    }}
})

export const{add,remove,newList} =currentToDoList.actions;
export default currentToDoList.reducer;