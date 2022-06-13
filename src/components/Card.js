import React from "react";

export default function Card(props) {
  return (
    <div className=" h-28 w-52 bg-white m-10 rounded-md shadow-md p-5">
      <div className="flex justify-between items-center">
        <img className=" h-10 w-10 rounded-full" src={props.profilePicture} />
        <div className=" flex flex-col">
          {props.name}
          <a className="mt-2 text-blue-400" href={props.profileLink}>
            {props.title}
          </a>
        </div>
      </div>
      <div className=" items-center"></div>
    </div>
  );
}
