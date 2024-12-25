/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length, setlength] = useState(8);
  const [numbersInclude,setnumbersInclude]=useState(false);
  const [charactersInclude, setcharactersInclude] = useState(false);
  const [password, setpassword] = useState("");

//useCallback hook
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbersInclude) str+="0123456789";
    if(charactersInclude) str+="!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      const char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
      
    };
    setpassword(pass)
  },[length,numbersInclude,charactersInclude,setpassword])

  //useEffect hook
  useEffect(()=>{
    passwordGenerator();

  },[length,numbersInclude,charactersInclude,setpassword]);

  //selecting a part by using useRef hook
  const passwordCopy=useRef(null);

  //copy logic

  const copyToClipboard=useCallback(()=>{
    console.log("password Copy using useRef and its Output is: ",passwordCopy);
    passwordCopy.current?.select()
    window.navigator.clipboard.writeText(password);

  },[password])
 

  return (
    <>
    <div className="w-full h-screen bg-green-500 flex items-center justify-center">


      <div className="w-full bg-white max-w-md p-4 rounded-md">

 
        <div className="flex justify-between mb-2">
          <input ref={passwordCopy} 
          type="text"
          value={password}
          
          className="bg-orange-200 text-violet-800 w-full p-1 font-semibold overflow-hidden outline-none"
          readOnly/>
          

         


          <button onClick={copyToClipboard} className=" bg-sky-500 text-white p-1 rounded-r-md">Copy</button>


        </div>

        <div className="flex justify-evenly">
          <input
           type="range"
           min={1}
           max={100}
           value={length}

           onChange={(e)=>setlength(e.target.value)}
            />
            <label >Length: {length}</label>

            <input
             type="checkbox"
             defaultChecked={numbersInclude}
             onClick={()=>setnumbersInclude((prev)=>!prev)}
              />
              <label >Number</label>
            <input
             type="checkbox"
             defaultChecked={charactersInclude}
             onClick={()=>setcharactersInclude((prev)=>!prev)}
              />
              <label >Characters</label>
        </div>


      </div>

    </div>
    </>
  )
}

export default App
