import React, { useRef, useState } from 'react';
import colors from '../components/colors';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertSucces from '../components/AlertSucces'
import AlertFailed from '../components/AlertFailed'

const Register = () => {
  const [passViewed, setPassViewed] = useState(false)
  const [cliked, setCliked] = useState(false)
  const [passViewed2, setPassViewed2] = useState(false)
  const [cliked2, setCliked2] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const succesRef = useRef(null)
  const failedRef = useRef(null)
  const navigate = useNavigate()

  const reg = async (e) => {
    e.preventDefault()
    const data = {
      username: username,
      email: email,
      password: password
    }

    try {
      if (password === rePassword) {
        const resp = await axios.post('http://localhost:1337/api/auth/local/register', data)
        if (resp.status === 200) {
          succesRef.current.className = "w-75 d-block"
          setTimeout(() => {
            succesRef.current.style.right = "2%"
          }, 100)
          setTimeout(() => {
            navigate('/login')
          }, 1500)
        }

      } else {
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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-100 d-flex justify-content-center flex-column align-items-center py-5 mt-3 container'>
      <h1 className='fw-bolder' style={{
        fontSize: '50px'
      }}>Register</h1>

      <form className='w-100 mt-3' onSubmit={(e) => reg(e)}>
        <label htmlFor=""></label>
        <div className="mb-3 form-control py-3">
          <input type="text" className="form-control border-0" placeholder="username" onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div className="mb-3 form-control py-3">
          <input type="email" className="form-control border-0" placeholder="email" onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3 form-control d-flex justify-content-between align-items-center py-3">
          <input type={passViewed ? 'text' : 'password'} className=" form-control border-0 me-1" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
          <i className={`${passViewed ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'} mx-2 fs-3`} onClick={() => {
            setPassViewed(true)
            setCliked(true)
            if (cliked === true) {
              setPassViewed(false)
              setCliked(false)
            }
          }}></i>
        </div>

        <div className="mb-3 form-control d-flex justify-content-between align-items-center py-3">
          <input type={passViewed2 ? 'text' : 'password'} className=" form-control border-0 me-1" placeholder="confirm Pass" onChange={(e) => setRePassword(e.target.value)} />
          <i className={`${passViewed2 ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'} mx-2 fs-3`} onClick={() => {
            setPassViewed2(true)
            setCliked2(true)
            if (cliked2 === true) {
              setPassViewed2(false)
              setCliked2(false)
            }
          }}></i>
        </div>

        <div className='w-100 d-flex mt-5 justify-content-center align-items-center'>
          <button className='fw-medium w-100 btn fs-2 py-3' style={{
            backgroundColor: colors.orange
          }} type='submit'>Register!</button>
        </div>
        <p className='text-center mt-4'>Already have an account? <Link to={'/login'} className='text-decoration-none'>Login Now!</Link></p>
      </form>

      <AlertSucces reftSucces={succesRef} text={'youve been registered we redirect to login page!'} />
      <AlertFailed reftFailed={failedRef} text={'sorry password must be match!'} />
    </div>
  );
};

export default Register;