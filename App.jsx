/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [characters, allowChar] = useState(false);
  const [numbers, allowNumbers] = useState(false);
  const [password, setPassword] = useState("");
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%&*|/?><.,+=-~";
    for (let i = 1; i <= length; i++) {
      let c = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(c);
    }
    setPassword(pass);
  }, [length, characters, numbers, password, setPassword]);
  useEffect(() => {
    generatePassword();
  }, [numbers, length, characters, setPassword, allowChar, allowNumbers]);
  const passwordref = useRef(null);

  const copytoclipboard = () => {
    passwordref.current?.select();
  
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="bg-gray-700 w-full max-w-md shadow-md rounded-lg px-4 py-4 my-10 gap-4 text-orange-400 text-center mx-auto">
        Random Password Generator
        <div className="flex shadow rounded-lg overflow-hidden mb-4 py-3">
          <input
            className="outlive-none w-full py-1 px-3 mx-4 rounded-lg"
            type="text"
            value={password}
            placeholder="password"
            ref={passwordref}
            readOnly
          />
          <button
            className="px-3 rounded-lg shadow-md"
            style={{ background: "green" }}
            onClick={copytoclipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 text-yellow-400">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer"
              value={length}
              
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
            <div className="flex text-sm gap-x-1 mx-4 text-yellow-400">
              <input
                type="checkbox"
                defaultChecked={numbers}
                id="numberInput"
                onChange={() => allowNumbers((prev) => !prev)}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex text-sm gap-x-2 text-yellow-400">
              <input
                type="checkbox"
                defaultChecked={characters}
                id="characterInput"
                onChange={() => allowChar((prev) => !prev)}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
