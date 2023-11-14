import React from 'react';
import colors from './colors';
import { Link } from 'react-router-dom';

const Navigation = ({ keyboardVisible, active1, active2, active3, active4 }) => {

    return (
        <div className='w-100 d-flex justify-content-between z-2 mt-3 position-absolute bottom-0' style={{
            visibility: keyboardVisible ? 'hidden' : 'visible',
        }}>
            <div className='w-100 d-flex h-100 rounded-3 py-2' style={{
                backgroundColor: colors.yellow
            }}>
                <Link to={'/home'} className='w-25 d-flex justify-content-center align-items-center flex-column text-decoration-none text-white'>
                    <i className="fa-solid fa-house fs-3 p-1" style={{
                        color: active1
                    }}></i>
                    <p className='mb-0' style={{
                        color: active1
                    }}>Home</p>
                </Link>
                <Link to={'/stock'} className='w-25 d-flex justify-content-center align-items-center flex-column text-decoration-none text-white'>
                    <i className="fa-solid fa-table fs-3 p-1" style={{
                        color: active2
                    }}></i>
                    <p className='mb-0' style={{
                        color: active2
                    }}>Stock</p>
                </Link>
                <Link to={'/cashier'} className='w-25 d-flex justify-content-center align-items-center flex-column text-decoration-none text-white'>
                    <i className="fa-solid fa-receipt fs-3 p-1" style={{
                        color: active3
                    }}></i>
                    <p className='mb-0' style={{
                        color: active3
                    }}>Cashier</p>
                </Link>
                <Link className='w-25 d-flex justify-content-center align-items-center flex-column text-decoration-none text-white'>
                    <i className="fa-solid fa-gear fs-3 p-1" style={{
                        color: active4
                    }}></i>
                    <p className='mb-0' style={{
                        color: active4
                    }}>Settings</p>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;