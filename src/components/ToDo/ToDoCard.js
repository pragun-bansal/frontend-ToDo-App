import React from 'react';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
const checked=true;
const ToDoCard = ({text,checked, updateMode, deleteToDo,toggleCheck}) => {
  return (
    <div className={checked?`todo relative mt-[1rem] bg-gray-700 text-white md:text-lg px-[1.5rem] py-[2rem] rounded-[5px]`:`todo relative mt-[1rem] bg-black text-white md:text-lg px-[1.5rem] py-[2rem] rounded-[5px]`}>
      <div className={checked?`line-through decoration-double w-[100%]`:`text`}>{text}</div>
      <div className="icons flex absolute top-[50%] translate-y-[-50%] right-[20px] gap-[0.5rem]">
        <button onClick={toggleCheck}>
        {!checked?<svg class="fill-[#ffffff]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>:<svg class="fill-[#ffffff]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>}
        </button>
        <BiEdit className="icon cursor-pointer text-[20px]" onClick={updateMode} />
        <AiFillDelete className="icon cursor-pointer text-[20px]" onClick={deleteToDo} />
        
      </div>
    </div>
  );
};

export default ToDoCard;
