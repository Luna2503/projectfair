import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);

  return (
    <>
    <div className='card shadow p-5 mt-3 me-5'>
        <div className='d-flex justify-content-between'>
            <h2>Profile</h2>
            <button className='btn btn-outline-info' onClick={()=>setOpen(!open)}>
            <i class="fa-solid fa-angle-down"></i>
            </button>
        </div>
        <Collapse in={open}>
        <div>
        
            <label htmlFor="profile" className='text-center mb-2 mt-3'>
                <input type="file" id="profile" style={{display:'none'}} />
                <img  className='mb-3' src="https://clipground.com/images/profile-png-5.png" alt="" width={"200px"} height={"200px"} />
            </label>
            <div>
            <input className=' form-control mb-3' type="text" placeholder='Github link' />
            <input className=' form-control mb-3' type="text" placeholder='Linkdin link' />
            <button className='btn btn-success rounded w-100'> Update</button>
            </div>

        </div>
      </Collapse>
        
    </div>
    </>
  )
}

export default Profile