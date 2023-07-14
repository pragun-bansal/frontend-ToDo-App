import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { addToDo, getToDoList, updateToDo, deleteToDo, createToDoList, getAllLists, deleteToDoList } from "../../utils/HandleApi";
import { getCurrentList } from "../../Redux/Slices/ToDoSlice";
import { getAllListsRedux } from "../../Redux/Slices/AllListsSlice";
import { AiFillDelete } from 'react-icons/ai'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/Slices/UserSlice";

export default function Sidebar({ logout, user, lists, ReduxList }) {
   const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
   const token = cookies.access_token
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   console.log(lists);
   const dispatch = useDispatch();
   const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
   };

   const user_id = user._id
   const navigate = useNavigate();

   const signout=()=>{
      dispatch(logoutUser());
      removeCookie("access_token")
      console.log(cookies.access_token);
      setTimeout( () => {
         window.location.reload();
      }, 300);
   }

   const createNewList = async () => {
      await createToDoList("New ToDo List", user._id,token);
      setTimeout(async () => {
         await dispatch(getAllListsRedux({user_id, token}));
      }, 300);
   };


   const handleClick = async (list) => {
      const list_id = list._id
      dispatch(getCurrentList({toDoListId:list_id, user_id,token}));
   }

   const handleDelete = async (list) => {
      await deleteToDoList(user._id, list._id,token);
      setTimeout(async () => {
         await dispatch(getAllListsRedux({user_id, token}));
      }, 300);
   }


   //   console.log("lists",ReduxList._id,lists);
   return (
      <div>

         <button
            onClick={toggleSidebar}
            aria-controls="default-sidebar"
            type="button"
            className={`inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg 2xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 `}
         >
            <span className="sr-only">Open sidebar</span>
            <svg
               className="w-6 h-6"
               aria-hidden="true"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
               ></path>
            </svg>
         </button>

         <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
               } 2xl:translate-x-0`}
            aria-label="Sidebar"
         >

            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
               <ul class="space-y-2 font-medium">
                  <li>
                     <span class="flex items-center p-2 text-gray-900 rounded-lge  group">
                        <svg class="w-5 h-5 text-gray-500 transition duration-75  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                           <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                           <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span class="ml-3">Dashboard</span>
                     </span>
                     <button onClick={toggleSidebar} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close menu</span>
                     </button>
                  </li>
                  {/* <li><img className="w-[50%] rounded-full " src={user.pfp} alt="pfp image" /></li> */}

                  {lists.map((list) => {
                     return (
                        <li class={list && ReduxList && list._id === ReduxList._id ? 'shadow-md shadow-black flex' : `flex`}>
                           <button onClick={() => { handleClick(list) }} class={`flex block w-[80%] content-start pl-5 p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group`}>
                              <svg class="flex-shrink-0 inline w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 fill-[#465267] group-hover:fill-gray-900" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                              <span class="inline ml-3 whitespace-nowrap">{list.name}</span>
                              {/* {list && ReduxList && list._id ===ReduxList._id?<><span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full  ">Viewing</span></>:<></>} */}
                           </button>
                           <button className="inline content-end" onClick={() => handleDelete(list)}>
                              <AiFillDelete className="icon cursor-pointer text-[20px] inline " />
                           </button>
                        </li>
                     )
                  })}
                  {/* <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg e hover:bg-gray-100 ">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 fill-[#465267] group-hover:fill-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
               <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">3</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
         </li>*/}
                  <li>
                     <button onClick={createNewList} class="flex items-center pl-5 p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" id="note-add"><path fill="#212121" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM6 3.5C6 3.22386 5.77614 3 5.5 3C5.22386 3 5 3.22386 5 3.5V5H3.5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H5L5 7.5C5 7.77614 5.22386 8 5.5 8C5.77614 8 6 7.77614 6 7.5V6H7.5C7.77614 6 8 5.77614 8 5.5C8 5.22386 7.77614 5 7.5 5H6V3.5Z"></path><path fill="#212121" d="M12.5 4H10.793C10.6944 3.65136 10.5622 3.31679 10.4003 3H12.5C13.8807 3 15 4.11929 15 5.5V9.78579C15 10.1836 14.842 10.5651 14.5607 10.8464L10.8464 14.5607C10.5651 14.842 10.1836 15 9.78579 15L5.5 15C4.11929 15 3 13.8807 3 12.5V10.4003C3.31679 10.5622 3.65136 10.6944 4 10.793V12.5C4 13.3284 4.67157 14 5.5 14L9 14V12C9 10.3431 10.3431 9 12 9H14V5.5C14 4.67157 13.3284 4 12.5 4ZM10 13.9518C10.0512 13.9275 10.0985 13.8944 10.1393 13.8536L13.8536 10.1393C13.8944 10.0985 13.9275 10.0512 13.9518 10H12C10.8954 10 10 10.8954 10 12V13.9518Z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">New List</span>
                     </button>
                  </li>
                  {/* <li>
            <button class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group" onClick={()=>{}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Home</span>
            </button>
         </li> */}
                  <li>
                     <button onClick={signout} class="flex items-center pl-5 p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group ">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">{user ? "Sign Out" : "Sign in"}</span>
                     </button>
                  </li>

               </ul>
            </div>
         </aside>
      </div>
   );
}