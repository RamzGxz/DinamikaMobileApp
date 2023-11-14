import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Navigation from '../components/Navigation';
import colors from '../components/colors';
import { Link } from 'react-router-dom';

const Home = ({ keyboardVisible, setKeyboardVisible, user, token }) => {
  const [userLoggedIn, setUserLoggedIn] = useState([])

  const getUsers = async () => {
    try {
      const resp = await axios.get(`http://localhost:1337/api/users/${user.id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserLoggedIn([resp.data])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      
      <hr className='mb-0' />
      <div className='w-100 d-flex justify-content-between mt-4 container align-items-center'>
        <div className=''>
          <h3 className='text-capitalize mb-0'>Hi, {user.username}!</h3>
          <p className='mb-0'>Welcome back home!</p>
        </div>
        {userLoggedIn.map((item => {
          const pict = item.pict
          return (
            <div className='rounded-circle' style={{
              width: 70,
              height: 70,
              backgroundImage: pict === null ? `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&usqp=CAU")` : `url("http://localhost:1337${pict.url}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              border: '3px solid white'
            }} key={item.id}></div>
          )
        }))}

      </div>
      <hr className='mb-0' />
      <div className='w-100 d-flex justify-content-center align-items-center mt-4 flex-column container'>
        <h5 className=''>REKAP PENJUALAN</h5>
        <div className='row w-100 d-flex justify-content-center align-items-center rounded-2 gap-0'>
          <div className="col col-6 d-flex justify-content-center align-items-center my-2" style={{
            height: "25vh",
          }}>
            <Link className='btn w-100 h-100 btn-success d-flex justify-content-center align-items-center'>Rekap Harian</Link>
          </div>
          <div className="col col-6 d-flex justify-content-center align-items-center my-2" style={{
            height: "25vh",
          }}>
            <Link className='btn w-100 h-100 btn-success d-flex justify-content-center align-items-center'>Rekap Mingguan</Link>
          </div>
          <div className="col col-6 d-flex justify-content-center align-items-center my-2" style={{
            height: "25vh",
          }}>
            <Link className='btn w-100 h-100 btn-success d-flex justify-content-center align-items-center'>Rekap Bulanan</Link>
          </div>
          <div className="col col-6 d-flex justify-content-center align-items-center my-2" style={{
            height: "25vh",
          }}>
            <Link className='btn w-100 h-100 btn-success d-flex justify-content-center align-items-center'>Rekap Tahunan</Link>
          </div>
        </div>
        
      </div>

      <Navigation keyboardVisible={keyboardVisible} setKeyboardVisible={setKeyboardVisible} active1={colors.black} />
    </div>
  );
};

export default Home;