import React from "react";
import sendIcon from "../assets/ai.png";
import MDEditor from "@uiw/react-md-editor";

function ChatResponse({ question, answer }) {
  return (
    <div className="w-full h-fit border-b-2 border-[#f5f5f5]  min-h-14 flex-col items-center p-2 mb-5">
      <div className="flex">
        <img src={sendIcon} className="h-full w-6 md:w-8" alt="send icon" />
        <div className="text-sm md:text-lg ms-5 my-auto w-full break-words font-bold">
          {question}
        </div>
      </div>

      <div className="flex">
        <div className="h-full  w-10 p-2"></div>

        <div className="ms-5 h-full w-full break-words">
          {/* Render markdown */}
          <MDEditor.Markdown
            className="text-sm md:text-lg"
            source={answer}
            style={{ backgroundColor: "white", color: "black" }}
          />{" "}
        </div>
      </div>
    </div>
  );

  // const formattedAnswer = answer.split("* ").map((line, index) => {
  //   return (
  //     <li key={index}>
  //       {line
  //         .split(/\*\*(.*?)\*\*/g)
  //         .map((part, i) =>
  //           i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  //         )}
  //     </li>
  //   );
  // });

  // return (
  //   <div className="w-full h-fit border-b-2 border-[#f5f5f5] min-h-14 flex-col   items-center p-2 mb-5 ">
  //     <div className="flex ">
  //       <img src={sendIcon} className="h-full w-10" />
  //       <div className="ms-5   my-auto w-full break-words font-bold">{question}</div>
  //     </div>

  //     <div className="flex">
  //       <div className="h-full w-10 p-2"></div>

  //       <div className="ms-5 h-full w-full break-words">
  //         <ul>{formattedAnswer}</ul>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default ChatResponse;
