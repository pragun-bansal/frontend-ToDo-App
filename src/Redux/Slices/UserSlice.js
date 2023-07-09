import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";




export const STATUSES = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
  });

//get currentList data

export const getUserRedux = createAsyncThunk( "getUserRedux",async(toDoListId,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/login/success`, {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
          },
        });
        console.log('check');
        if (response.status === 200) {
          const resObject = response.data;
          console.log(resObject);
          return resObject.user;
        } else {
          throw new Error('Authentication failed!');
        }
      } catch (err) {
        return rejectWithValue(err);
      }
})

const User = createSlice({
    name:'User',
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
    .addCase(getUserRedux.pending,(state,action)=>{
        state.status = STATUSES.LOADING;
    })
    .addCase(getUserRedux.fulfilled,(state,action)=>{
        state.data = action.payload;
        state.status = STATUSES.IDLE;
    })
    .addCase(getUserRedux.rejected,(state,action)=>{
        state.status = STATUSES.ERROR;
    })
    }}
})

export const{add,remove,newList} =User.actions;
export default User.reducer;