import {useRef} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import classes from './ForgetPassword.module.css';


const ForgetPassword = () => {
    const emailRef=useRef();
    const navigate=useNavigate();




const ForgetPasswordHandler=()=>{
   
    const enteredEmail=emailRef.current.value; 

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAP0I1s0XAywC5wK4wSbDw-qVsrlSQPH8o',{
        method:'POST',
        body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:enteredEmail,
        }),
        headers:{
          'content-type':'application/json'
        }
        }).then((res)=>{
            if(res.ok){
            console.log(res);
         alert('email verification sent')
        }
        })
        .catch((err)=>{
          alert('error in email verification')
        })
        navigate("/login")
}

  return (
    <>
    <h1 style={{textAlign:"center",margin:"20px",color:"brown"}}>Forget Password Page</h1>
    <div className={classes.container}>
       
        <form className={classes.main} onSubmit={ForgetPasswordHandler}>
         <label className={classes.label} htmlFor='input'>Enter the E-mail with which you have Registered:</label><br/>
         <input className={classes.input} id='input' placeholder='Email' type='email' ref={emailRef}/><br/>
         <button className={classes.button}> Send Link</button>
         <p className={classes.paragraph}>Already a user?</p>
        </form>
 
    </div>
    </>
  )
}

export default ForgetPassword