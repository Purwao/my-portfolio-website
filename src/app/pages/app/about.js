"use client";

import { useRef, useState } from "react";
import TitleBar from "../titlebar";
import Draggable from "react-draggable";
import zani from "../../storage/photos/zani.jpeg";
import Image from "next/image";

function About(props) {
  const [isClosing, setIsClosing] = useState(false);

  const nodeRef = useRef(null);

  function handleClose(action) {
    console.log(action);
    if (action == 1) {
      setIsClosing(true);
      setTimeout(() => {
        props.close?.(1);
        console.log("Closing the About page");
      }, 300);
    }
  }

  return (
    <div
      id="about"
      className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 100, y: 100 }}
      >
        <div
          ref={nodeRef}
          className={`pointer-events-auto absolute flex flex-col items-center w-3/6 bg-accent1/90 backdrop-blur-md border border-accent4 rounded-2xl shadow-xl overflow-hidden transition-opacity duration-300`}
        >
          <div className="handle w-full">
            <TitleBar
              title="About"
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>

          {/* Profile Section */}
          <div className="flex items-start gap-4 p-6 bg-accent2 w-full text-white">
            <Image
              src="https://avatars.githubusercontent.com/Purwao"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-accent3 object-cover"
              width={96}
              height={96}
            />
            <div>
              <h1 className="text-4xl font-bold text-accent3">
                Purwao{" "}
                <span className="text-accent4 font-medium  text-xl align-middle">
                  Lalalawrens
                </span>
              </h1>
              <p className="text-lg mt-1">FullStack Developer.</p>
              {/* <p className="text-sm">
                Pursuing my bachelor&apos;s degree at{" "}
                <a
                  href="https://www.upnjatim.ac.id/"
                  className="text-accent3 underline font-medium hover:text-accent4"
                >
                  UPNVJT
                </a>
              </p> */}
            </div>
          </div>

          {/* Scrollable Bio Section */}
          <div className="px-6 pb-6 h-64 w-full overflow-y-auto bg-accent1/80 text-white">
            <p className="mb-4 text-xl">Hi! I&apos;m Purwao 👋</p>
            <p className="text-2xl font-consolas">👤 I DO:</p>
            <ul className="list-disc list-inside space-y-1 text-md">
              <li>
                Build appealing{" "}
                <span className="text-accent3/90 font-bold">website</span>
              </li>
              <li>
                Build experimental{" "}
                <span className="text-accent3/90 font-bold">desktop apps</span>
              </li>
              <li>
                Build{" "}
                <span className="text-accent3/90 font-bold">android apps</span>
              </li>
            </ul>
            <p className="mt-4 text-2xl font-consolas">🎓 EDUCATION:</p>
            <ul className="list-none list-inside space-y-1 text-md">
              <li>
                <p>
                  Bachelor&apos;s of Science in Computer Science at{" "}
                  <a
                    href="https://www.upnjatim.ac.id/"
                    target="._blank"
                    className="text-accent3 underline font-medium hover:text-accent4"
                  >
                    UPNVJT
                  </a>
                </p>
              </li>
              <li className="list-none text-accent4/90">
                (currently pursuing)
              </li>
            </ul>
            <p className="mt-4 text-2xl font-consolas">🧪 OTHER INTEREST:</p>
            <ul className="list-disc list-inside space-y-1 text-md">
              <li>Music</li>
              <li>Chess</li>
              <li>Souls-like gaem eheheh :p</li>
            </ul>
            <p className="mt-4 text-2xl font-consolas">
              🌍 LANGUAGE PROFICIENCY:
            </p>
            <ul className="list-disc list-inside space-y-1 text-md">
              <li className="list-none">
                <p>
                  I have fluency in{" "}
                  <span className="text-accent3/90 font-bold">English</span> and{" "}
                  <span className="text-accent3/90 font-bold">Indonesia</span>!
                </p>
              </li>
              <li className="list-none text-xs font-light text-accent4/90">
                i speak a little Japanese and Germany, but at very pre-school
                proficiency {":)"}
              </li>
            </ul>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default About;
