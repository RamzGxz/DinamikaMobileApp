import React, { useEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import { Offline, Online } from "react-detect-offline";
import Stock from './pages/Stock';
import Cashier from './pages/Cashier';
import Struks from './pages/Struks';

const App = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [user, setUser] = useState([])
  const [token, setToken] = useState("")
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  return (
    <div className='' style={{
      fontFamily: 'poppins, sans-serif'
    }}>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/home' element={<Home keyboardVisible={keyboardVisible} setKeyboardVisible={setKeyboardVisible} user={user} token={token}/>}/>
        <Route path='/login' element={<Login setUser={setUser} user={user} setToken={setToken}/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/stock' element={<Stock keyboardVisible={keyboardVisible} setKeyboardVisible={setKeyboardVisible} token={token}/>} />
        <Route path='/cashier' element={<Cashier keyboardVisible={keyboardVisible} setKeyboardVisible={setKeyboardVisible} token={token} total={total} setItems={setItems} items={items} setTotal={setTotal}/>} />
        <Route path='/struks' element={<Struks items={items} total={total} setItems={setItems} setTotal={setTotal}/>}/>
      </Routes>
    </div>
  )
}

export default App;