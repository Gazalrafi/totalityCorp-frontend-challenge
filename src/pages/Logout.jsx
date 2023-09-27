import React from 'react';
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()

    const email = localStorage.getItem('originalEmail');

    function logoutHandler() {
        localStorage.removeItem('senderEmail')
        localStorage.removeItem('token')
        localStorage.removeItem('originalEmail')
        navigate('/login')
    }

  return (
   <>
            <div>
                <button className="btn btn-outline-dark m-2" onClick={logoutHandler}>Logout</button>
            </div>
   </>
  )
}

export default Logout