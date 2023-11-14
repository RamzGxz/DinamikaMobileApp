import React from 'react';

const AlertFailed = ({ reftFailed, text }) => {
    return (
        <div className='w-75 d-none z-3' style={{
            position: "absolute",
            bottom: 10,
            right: "-100%",
            transition: "all .3s",
            zIndex: 99999
        }} ref={reftFailed}>
            <div className="alert alert-danger d-flex align-items-center w-100" role="alert">
                <i className="fa-solid fa-circle-xmark pe-2 fs-5"></i>
                <div>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default AlertFailed;