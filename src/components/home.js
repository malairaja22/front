import axios from "axios";
import env from "react-dotenv"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Chat } from './chat'

export const Home = () => {
    const [list, setList] = useState([]);
    const [chatname, setChatname] = useState('');
    const [arr, setArr] = useState([{_id:"hh"}])

    const navigate = useNavigate();

    const { state } = useLocation();
    useEffect(() => {
        if (state) {
            fetchcontactlist()
        }

    }, [])



    useEffect(() => {
        if (state) {
            fetchchat()
        }

    }, [chatname])

    useEffect(() => {
        if (state) {
            const timer = setInterval(fetchchat, 5000);
            return () =>clearInterval(timer);
        }

    });

    if (!state) {
        return <h1><a href="/signin">Login Click Here</a></h1>
    }
    var { user } = state;


    const fetchcontactlist = async () => {
        await axios.post(`${env.URL}/contactlist`, { user: user })
            .then((res) => {
                setList([...res.data])

            }).catch((err) => {
                console.log(err)
            })
    }

    const addcontactfinal = async (e) => {
        await axios.post(`${env.URL}/addcontact`, { contact: e, currentuser: user })
            .then((req) => {
                if (req.data === "OK") {
                    fetchcontactlist();
                }
               

            }).catch((err) => {
                console.log(err)
            })
    }
    const addcontact = async () => {
        let name = await prompt("Enter contact name");
        await axios.post(`${env.URL}/searchcontact`, { username: name })
            .then((req) => {

                if (req.data === "Username Not found") {
                    alert(req.data)
                } else {
                    
                    if(list.find((e)=> e === req.data)){
                        alert('user already added');
                    }else{
                        addcontactfinal(req.data);
                    }
                    
                }
            }).catch((err) => console.log(err))
    }

    const fetchchat = async () => {
        await axios.post(`${env.URL}/getmessage`, { from: user, to: chatname })
            .then((res) => {
                if(arr[0]._id !== res.data[0]._id){
                    setArr(res.data)
                    window.scrollTo(0, document.querySelector(".chat").scrollHeight);
                }   

            }).catch((err) => {
                console.log(err)
            })
    }

    const logout = () => {
        let a=window.confirm("Are you Sure?");
        if(a){
            navigate('/signin');
        }
        
    }
    const currentchat = (e) => {
        setChatname(e.target.innerText);
        setArr([{_id:"tt",message:"Loading",time:"00000"}])
    }

    return <>
        <div className="chatcontainer">
            <div className="container1">
                <div className="profile">
            <h3>{user}</h3>
            <button className="logout" onClick={logout}>Logout</button>
            <button className="addcontact" onClick={addcontact}>+</button>
            </div>

            {
                list.map((val) => {
                    return (
                        <div key={val} onClick={currentchat} className="chatlist" >
                            <p>{val}</p>
                        </div>
                    )
                })
            }
            </div>
            <Chat name={chatname} from={user} arr={arr} />
        </div>
        
    </>
}