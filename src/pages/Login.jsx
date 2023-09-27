import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import classes from './Login.module.css';
import { useNavigate,NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authDetailSliceAction } from '../redux/authDetailSlice';


const Login = () => {

  const navigate = useNavigate();


  const dispatch = useDispatch()


  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef();
  const [isSignupScreen, setIsSignupScreen] = useState(true);
  const [error, setError] = useState('');
  const [errorClass, setErrorClass] = useState('');

  const [spinner, setSpinner] = useState(false);




  async function submitForm(e) {
      setSpinner(true)

      e.preventDefault();
      setErrorClass('');
      const myemail = emailRef.current.value
      const password = passwordRef.current.value
      let url;

      if (isSignupScreen && (password !== confirmPasswordRef.current.value)) {
          setErrorClass(`${classes.error}`);
          setError('Password and Confirm Password are not same')
          return;

      }

      if (isSignupScreen) {
          url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAP0I1s0XAywC5wK4wSbDw-qVsrlSQPH8o"
      }
      else {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAP0I1s0XAywC5wK4wSbDw-qVsrlSQPH8o'

      }

      const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
              email: myemail,
              password: password,
              returnSecureToken: true
          }),
          headers: {
              "Content-Type": "application/json"
          }
      })

      if (response.ok) {
          console.log('hello');
          const data = await response.json()
          const token = data.idToken;

          localStorage.setItem('originalEmail', myemail)

          const email = `${myemail.replace(/\.|@/g, '')}`

          localStorage.setItem('senderEmail', email)


          localStorage.setItem('token', token)
          // confirmEmail()
          // navigate('/confirm')
          // dispatch(authActions.login(token))

          setSpinner(false)
          dispatch(authDetailSliceAction.logIn(true))
          navigate('/')



      }
      else {
          const data = await response.json()
          setError(data.error.message);
          console.log('error');
          setSpinner(false)


      }
  }

  function toggleSignup() {
      setError('')
      setIsSignupScreen(prevValue => !prevValue)
  }
  return (
    <>
    <div style={{marginBottom:"100px"}}>
      <Navbar />
    </div>

      <div className={classes.signup}>
            <form className={`${classes.form} ${errorClass} `} onSubmit={submitForm}>
                <h1>{isSignupScreen ? 'SignUp' : 'Login '}</h1>
                <div className={classes.textFields}>

                    <input type='email' ref={emailRef} placeholder='Email' required />

                    <input type='password' minLength='6' ref={passwordRef} placeholder='Password' required />

                    {isSignupScreen && <input type='password' minLength='6' ref={confirmPasswordRef} placeholder='Confirm Password' required />}
                    <div className={classes.signupContainer}>
                        <button type='submit' className={classes.signupButton}>{isSignupScreen ? 'Sign Up' : "Login"}</button>
                    </div>

                    <div className={classes.forgetButtonContainer}>
                        <NavLink to='/forget'>forget password?</NavLink>
                    </div>

                    <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}> {error}</p>

                </div>
            </form>

            <button onClick={toggleSignup} className={classes.loginButton}>{isSignupScreen ? 'Have an Account? Login' : 'Dont have an Account? Sign up'}</button>
            {spinner && <div className={classes.loader}></div>}


        </div>
      
      <Footer />
    </>
  );
};

export default Login;
