import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [num , setNum] = useState(false);
  const [char , setChar] = useState(false);
  const [password , setPassword] = useState("");


  const passwordGenerator = useCallback(() =>{
    let pass ="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(num) {
      str += "1234567890"
    }
    if(char){
      str +="@#$%^&*~!"
    }

    for(let i=1; i<=length; i++){
        let x= Math.floor(Math.random()*str.length + 1);
        pass += str.charAt(x);
    }
    setPassword(pass);

  },[length,num,char]);

  const passwordref = useRef(null);

  const copyClip= useCallback(() =>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
     
  useEffect(() =>{
    passwordGenerator()
  },[length,num,char,passwordGenerator])
  
  return (
    <>
    <h1 className="text-5xl font-bold text-white">
      
    </h1>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 my-3'>
        <input type="text"
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={passwordref}
        />
        <button className='text-white bg-blue-600 px-2 py-2' onClick={copyClip} >copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
           min={8}
           max={35}
           value={length}
           className='cursor-pointer'
           onChange={(e) => {setlength(e.target.value)}}
          />
          <lable>Length :{length}</lable>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
         
           id="numInput"
           onChange={()=>{
            setNum((pre) => !pre)
           }}
            />
            <lable htmlfor="numInput">Number</lable>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          
           id="charInput"
           onChange={()=>{
            setChar((pre) => !pre)
           }}
            />
            <lable htmlfor="charInput">Character</lable>
        </div>
      </div>
    </div>
     
    </>
  )
}

export default App
