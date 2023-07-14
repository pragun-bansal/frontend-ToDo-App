import React from 'react'
import { useCookies } from 'react-cookie';
import {useDispatch} from "react-redux";
import { getCurrentList } from "../../Redux/Slices/ToDoSlice";
const Logo = require("../Images/Logo.jpg")


const AllLists = ({lists,user}) => {

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const token = cookies.access_token
  const dispatch = useDispatch();
const handleClick=async(list)=>{
  const toDoListId = list._id;
  // console.log("list",toDoCurrentList)
    const user_id = user._id
    dispatch(getCurrentList({toDoListId,user_id,token}));
}

  return (
    <div className='justify-center text-center'>
    <div class = " mx-auto">
    <img className='h-[20%] mx-auto' src={Logo} alt="logo" />
    <h1 class="text-[45px] align-center ">Welcome To the ToDoApp</h1>
    </div>
    <div >

      <div class=" mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 0">
          <div class="flex items-center justify-between mb-4">
              <h5 class="text-xl font-bold text-[30px] leading-none text-gray-900 mx-auto">ToDoLists</h5>
        </div>
        <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200 ">
                  {lists.map((list)=>{
                    return(
                    <li >
                      <div class="flex py-[20px] items-center space-x-4  border-t-[2px] hover:shadow-lg">
                          <button onClick={()=>handleClick(list)} class="flex-1 min-w-0">
                              <h1 class="text-sm font-medium text-gray-900 truncate">
                                  {list.name}
                              </h1>
                          </button>
                      </div>
                  </li>
                  )})}
                  
              </ul>
        </div>
      </div>

    </div>
    </div>
  )
}

export default AllLists