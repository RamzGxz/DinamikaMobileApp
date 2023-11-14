import React from 'react';

const AlertSucces = ({ reftSucces, text }) => {
    return (
        <div className='w-75 d-none' style={{
            position: "absolute",
            bottom: 10,
            right: "-100%",
            transition: "all .3s",
            zIndex: 99999
        }} ref={reftSucces}>
            <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="fa-solid fa-circle-check pe-2"></i>
                <div>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default AlertSucces;