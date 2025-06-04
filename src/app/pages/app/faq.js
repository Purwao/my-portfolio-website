import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import TitleBar from "../titlebar";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import AccordionOpen from "../../storage/audio/accordion.mp3"

const AccordionItem = ({ title, children, index, isOpen, toggle }) => {
  return (
    <div className="w-full bg-accent4/30 border border-white text-white rounded-md shadow-sm overflow-hidden transition-all duration-300">
      <button
        onClick={() =>{
          toggle(index);
      
        } }
        className="w-full flex justify-between items-center px-4 py-4 hover:bg-white/10 transition-colors"
      >
        <span className="text-left font-semibold text-base">{title}</span>
        <span className="transition-transform duration-300">
          {isOpen ? (
            <FaMinus className="w-4 h-4 text-white" />
          ) : (
            <FaPlus className="w-4 h-4 text-white" />
          )}
        </span>
      </button>

      <div
        className={`px-4 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="pb-4 text-sm text-slate-200">{children}</div>
      </div>
    </div>
  );
};

function Faq(props) {

  const nodeRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [isClosing, setIsClosing] = useState(false);


  const handleClose = (action) => {
    if (action === 1) {
      setIsClosing(true);
      setTimeout(() => {
      console.log("Closing the FAQ page");
      props.close?.(1);
      }, 300);
    
    }
  };

 

  const toggle = (index) => {
    new Audio(AccordionOpen).play();
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Who are you?",
      content: (
        <p>
          Hi! I&apos;m <strong>Purwao</strong> 👋 Just your friendly neighborhood fullstack developer,
          wrangling code by day and tinkering with desktop apps by night. I like building things that
          look cool <em>and</em> work well. Also, I probably drink too much coffee ☕.
        </p>
      ),
    },
    {
      title: "What do you do?",
      content: (
        <p>
I do fullstack and backend development — I write the code that runs the site and the code that 
makes it look like it’s working. I also build experimental desktop apps when I get bored. 
Occasionally, I try to make websites that don’t look like they were made in 2004.
        </p>
      ),
    },
    {
      title: "What is a Fullstack Developer?",
      content: (
        <p>
          A fullstack developer works on both frontend (cool stuff you see) and backend (the nerd
          stuff behind the scenes). Think of it as being the chef and the waiter at the same time —
          except instead of food, it&apos;s code.
        </p>
      ),
    },
    {
      title: "Are you open for commissions?",
      content: (
        <p>
          Yes! I&apos;m currently open to commissions and work offers. Feel free to email me{" "}
          <a
            href="mailto:purwaarda51@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent3 hover:text-accent4 underline inline-flex items-center"
          >
            <MdEmail className="inline mr-1" size={16} /> here!
          </a>
        </p>
      ),
    },
    {
  title: "Tech Stack?",
  content: (
       <ul className="list-disc list-inside space-y-1 text-md">
      <li>
        <strong>Frontend:</strong> JavaScript (React, Next, Vite)
      </li>
      <li>
        <strong>Backend:</strong> PHP, Python, Laravel
      </li>
      <li>
        <strong>Databases:</strong> MySQL, SQLite
      </li>
      <li>
        <strong>Currently Learning:</strong> ASP.NET
      </li>
    </ul>
  ),


    },
    {
      title: "What is your educational background?",
      content: (
        <p>
          I&apos;m currently pursuing a <strong>Bachelor&apos;s of Science in Computer Science</strong> 

        </p>
      ),
    },
    {
      title: "What are your interests?",
      content: (
        <ul className="list-disc list-inside space-y-1 text-md">
          <li>🎵 Music – I like both vibing and overanalyzing lyrics.</li>
          <li>♟️ Chess – yes.</li>
          <li>🧃 Souls-like games – I enjoy suffering, apparently.</li>
        </ul>
      ),
    },
    {
      title: "Coffee?",
      content: (
        <p>
       hell yea {':)'}
        </p>
      ),
    },
  ];

  return (
        <div className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}>
      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 100, y: 100 }}
      >
        <div
          ref={nodeRef}
          className="pointer-events-auto absolute w-[90vw] max-w-xl h-[60vh] flex flex-col bg-accent1/90 backdrop-blur-sm shadow-2xl border border-accent4 rounded-2xl overflow-hidden"
        >
          <div className="handle w-full">
            <TitleBar
              title="FAQs"
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                index={index}
                title={item.title}
                isOpen={openIndex === index}
                toggle={toggle}
              >
                {item.content}
              </AccordionItem>
            ))}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Faq;
