import React from 'react';
import colors from '../components/colors';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div className='container text-center py-2 vh-100 d-flex align-items-center flex-column'>
      <img src="https://img.freepik.com/free-vector/organic-flat-printing-industry-illustration_23-2148896935.jpg?w=740&t=st=1690524354~exp=1690524954~hmac=91ed3c02633a488525f8e8037b9a903d7024530d53f21ff43d08992f1ea1dcd3" alt="" style={{
        width: '100%',
        height: '50vh'
      }} className='rounded-5' />

      <h1 className='mt-5 fw-medium'>Dinamika Digital Printing</h1>
      <p className='mt-3'>Aplikasi Dinamika Digital Printing adalah aplikasi yang melakukan sejumlah kalkulasi aritmatika dalam stock yang telah tersedia dan dapat mencetak invoice atau nota pembelian</p>

      <div className='w-100 mt-5 d-flex justify-content-between align-items-center rounded-3 border-0' style={{
        backgroundColor: colors.orange,
        height: '8vh',
        padding: 0
      }}>
        <button className='btn btn-dark h-100 w-50 fs-2 fw-medium' onClick={() => {
          navigate('/register')
        }}>Register</button>
        <button className='btn h-100 w-50 fs-2 rounded-0 fw-medium' style={{
          color: colors.black
        }} onClick={() => {
          navigate('/login')
        }}>Login</button>
      </div>
    </div>
  );
};

export default Welcome;