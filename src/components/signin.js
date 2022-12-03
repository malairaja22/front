import {useState} from 'react'
import axios from "axios"
import env from "react-dotenv"
import { useNavigate } from 'react-router-dom'

export const Signin=()=>{
    const [user,setUser]=useState('');
    const [pass,setPass]=useState('');

    const navigate = useNavigate()

const submit1=async(e)=>{
e.preventDefault()
console.log(user,pass);
 await axios.post(`${env.URL}/signin`, { username: user, password: pass })
 .then((req)=>{
    alert(req.data)
    if(req.data === user && req.status === 200){
        setUser('');
        setPass('');
        navigate('/',{state:{user:user}})
    }
 })

}
    return <>
            <div className='container'>
               <form>
            <h1>Sign In</h1>
                <label>Username</label>
                    <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} />
                    <br />
                    <label>Password</label>
                    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                    <br />
                    <button onClick={submit1} >Sign In</button>
                    <p>Create new account? <a href="/signup">Sign Up</a></p>
                    </form> 
            </div>
    </>
}