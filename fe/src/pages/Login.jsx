import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import colors from '../components/colors';
import AlertSucces from '../components/AlertSucces'
import AlertFailed from '../components/AlertFailed'
import axios from 'axios';

const Login = ({ setUser, user, setToken }) => {
  const [passViewed, setPassViewed] = useState(false)
  const [cliked, setCliked] = useState(false)
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()
  const succesRef = useRef(null)
  const failedRef = useRef(null)

  const log = async (e) => {
    e.preventDefault()
    const data = {
      identifier: username,
      password: pass
    }
    try {
      const resp = await axios.post('http://localhost:1337/api/auth/local', data)
      if (resp.status === 200) {
        setUser(resp.data.user)
        setToken(resp.data.jwt)
        succesRef.current.className = "w-75 d-block"
        setTimeout(() => {
          succesRef.current.style.right = "2%"
        }, 100)
        setTimeout(() => {
          navigate('/home')
        }, 1500)
      }
    } catch (error) {
      failedRef.current.className = "w-75 d-block"
      setTimeout(() => {
        failedRef.current.style.right = "2%"
      }, 100);
      setTimeout(() => {
        failedRef.current.style.right = "-100%"
        setTimeout(() => {
          failedRef.current.className = "w-75 d-none"
        }, 300)
      }, 2000)
    }
  }

  return (
    <div className='w-100 d-flex justify-content-center flex-column align-items-center py-5 mt-3 container'>
      <h1 className='fw-bolder' style={{
        fontSize: '50px'
      }}>Hello Again!</h1>
      <h4 className='mt-3 fw-lighter text-center'>Welcome back You've <br /> been missed!</h4>

      <form className='w-100 mt-5' onSubmit={(e) => log(e)}>
        <div className="mb-3 form-control py-3">
          <input type="text" className="form-control border-0" placeholder="enter a username here" onChange={(e) => {
            setUsername(e.target.value)
          }} />
        </div>
        <div className="mb-3 form-control d-flex justify-content-between align-items-center py-3">
          <input type={passViewed ? 'text' : 'password'} className=" form-control border-0 me-1" placeholder="enter a password here" onChange={(e) => { setPass(e.target.value) }} />
          <i className={`${passViewed ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'} mx-2 fs-3`} onClick={() => {
            setPassViewed(true)
            setCliked(true)
            if (cliked === true) {
              setPassViewed(false)
              setCliked(false)
            }
          }}></i>
        </div>
        <div className='w-100 d-flex justify-content-end'>
          <Link to={'/recovery'} className='text-decoration-none text-white'>Recovery Password</Link>
        </div>

        <div className='w-100 d-flex mt-5 justify-content-center align-items-center'>
          <button className='fw-medium w-100 btn fs-2 py-3' style={{
            backgroundColor: colors.orange
          }} type='submit'>Sign In</button>
        </div>
        <p className='text-center mt-4'>Not a member? <Link to={'/register'} className='text-decoration-none'>Register Now!</Link></p>
      </form>
      <AlertSucces reftSucces={succesRef} text={'Login Succes, redirect to Home!'} />
      <AlertFailed reftFailed={failedRef} text={'Sorry, we cant provide the user!'} />
    </div>
  );
};

export default Login;