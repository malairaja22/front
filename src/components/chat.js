import { useState } from "react"
import axios from "axios"
import env from "react-dotenv"

export const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [t1,setT1]=useState(0)

    const send = async () => {
        const d = new Date();
        let time = d.getTime();
        console.log(props.from, time)
        try {
            await axios.post(`${env.URL}/addmessage`, { from: props.from, to: props.name, message: message, time: time })
                .then((res) => {
                    if (res.data === "success") {
                        setMessage('');
                    }

                }).catch((err) => {
                    console.log(err)
                })
        } catch (err) {

        }
    }
    if (!props.name) {
        return <>
        <div className="container2 nfound"><h1>Add<br />OR<br /> Select <br />Contact</h1></div>
        </>
    }

    const toggle=()=>{
       let a= document.querySelector('.container1');
       let b= document.querySelector('.toggle');
       if(t1%2 === 0){
        a.style.left="-60%";
        setT1(()=>t1+1);
        setTimeout(()=>{
            b.style.left="5vh";
            b.innerText="=";
        },1000); 
       }else{
        a.style.left="0";
        setT1(()=>t1+1);
        b.style.display="none";
        setTimeout(()=>{
            b.style.left="85vw";
            b.innerText="X";
            b.style.display="block";
        },1000);
        
       }
       
    }

    return <>

        <div className="container2">
            
            <div className="chathead">
            <button className="toggle" onClick={toggle}>X</button>
                <h1>{props.name}</h1>
            </div>
            <div className="chat">
                {
                    props.arr.map((val) => {
                        var d = new Date(val.time).toLocaleTimeString();
                        if (val.to === props.name) {
                            return <div key={val._id} className='chatpop2'>
                            <div className="p1">
                            <p> {val.message}</p>
                            </div>
                            <div className="p2">
                            <p>{d}</p>
                            </div>
                        </div>
                        
                        } else {
                            return <div key={val._id} className='chatpop1'>
                                <div className="p1">
                                <p> {val.message}</p>
                                </div>
                                <div className="p2">
                                <p>{d}</p>
                                </div>
                            </div>
                        }

                    })
                }
            </div>
            <div className="inputbox">
                <input type="text" value={message} placeholder="Type a Message" onChange={(e) => setMessage(e.target.value)} />
                <button onClick={send}>Send</button>
            </div>
        </div>
    </>
}