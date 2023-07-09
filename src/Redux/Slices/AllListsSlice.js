import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";




export const STATUSES = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
  });

//get currentList data

export const getAllListsRedux = createAsyncThunk( "getAllListsRedux",async(user_id,{rejectWithValue})=>{
    console.log("ktu ni jaa rhi")
    const response =await axios.post(`${process.env.REACT_APP_SERVER_URL}/getAllLists`,{user_id:user_id})
    
    try{
        console.log(response)
        const result = response.data;
        console.log("AllLists",result);
        return result;
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err);
    }
})

const allLists = createSlice({
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
    .addCase(getAllListsRedux.pending,(state,action)=>{
        state.status = STATUSES.LOADING;
    })
    .addCase(getAllListsRedux.fulfilled,(state,action)=>{
        state.data = action.payload;
        state.status = STATUSES.IDLE;
    })
    .addCase(getAllListsRedux.rejected,(state,action)=>{
        state.status = STATUSES.ERROR;
    })
    }}
})

export const{add,remove,newList} =allLists.actions;
export default allLists.reducer;