import { useState } from 'react'
import axios from "axios"
import env from "react-dotenv"
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [pass1, setPass1] = useState('');

    const navigate = useNavigate()

    const submit1 = async (e) => {
        e.preventDefault();
        if (pass === pass1) {
            try {
                await axios.post(`${env.URL}/signup`, { username: user, password: pass })
                    .then((req) => {
                        console.log(req)
                        if (req.status === 200) {
                            alert(req.data);
                            setUser('');
                            setPass('');
                            setPass1('');
                            if(req.data === user){
                                navigate('/signin')
                            }
                        }

                    }).catch(err => alert(err))

            } catch (err) {
                alert(err);
            }


        }else{
            alert("Password not Match")
        }

    }
    return <>
        <div className='container'>
            
            <form>
               <h1>Sign Up</h1>
                <label>Username</label>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                <br />
                <label>Password</label>
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <br />
                <label>Retype Password</label>
                <input type="password" value={pass1} onChange={(e) => setPass1(e.target.value)} />
                <br />
                <button type="submit" onClick={submit1} >Sign Up</button>
                <p>Already have an account? <a href="/signin">Sign In</a></p>
            </form>
        </div>
    </>
}