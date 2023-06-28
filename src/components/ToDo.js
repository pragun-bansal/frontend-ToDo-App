import React from 'react';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'

const ToDo = ({text, updateMode, deleteToDo}) => {
  return (
    <div className="todo relative mt-[1rem] bg-black text-white px-[1.5rem] py-[2rem] rounded-[5px]">
      <div className="text">{text}</div>
      <div className="icons flex absolute top-[50%] translate-y-[-50%] right-[20px] gap-[0.5rem]">
        <BiEdit className="icon cursor-pointer text-[20px]" onClick={updateMode} />
        <AiFillDelete className="icon cursor-pointer text-[20px]" onClick={deleteToDo} />
      </div>
    </div>
  );
};

export default ToDo;
