import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center mt-5 bg-success mb-5 p-3'>
        <div className='footer d-flex align-items-center justify-content-evenly mt-5'>
          <div className='website' style={{ width: "400px" }} >
            <h5>       <i class="fa-solid fa-cart-shopping me-3"></i> Project Fair</h5>
            <p style={{ textAlign: "justify" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt voluptatibus quod quisquam est natus, accusamus corrupti ullam sunt aut odit culpa aperiam fuga asperiores, esse praesentium, hic dolores doloribus ipsam.</p>
          </div>
          <div className='links d-flex flex-column ms-5 mt-0'>
            <h5>Links</h5>
            <Link style={{ textDecoration: "none", color: "black" }} to='/'>Home</Link>
            <Link style={{ textDecoration: "none", color: "black" }} to='/login'>Login</Link>
            <Link style={{ textDecoration: "none", color: "black"}} to='/register'> Register</Link>
          </div>
          <div className='d-flex flex-column ms-5 mt-0'>
            <h5>Guides</h5>
            <Link style={{ textDecoration: "none", color: "black" }} to='https://react.dev/' target='blank'>React</Link>
            <Link style={{ textDecoration: "none", color: "black" }} to='https://react-bootstrap.netlify.app/' target='blank'>React Bootstrap</Link>
            <Link style={{ textDecoration: "none", color: "black" }} to='https://bootswatch.com/' target='blank'> Boots Watch</Link>
          </div>
          <div className='contactus d-flex flex-column ms-5 mt-0'>
            <h5>Contact Us</h5>
            <div className='d-flex'>
              <input type="text" className='form-comtrol' placeholder='Enter your email'  />
              <button className='btn btn-warning ms-3'> Subscribe</button>
            </div>
            <div className='d-flex mt-4 justify-content-evenly align-items-center'>
              <Link><i class="fa-brands fa-instagram fa-2xl ms-3"></i></Link>
              <Link><i class="fa-brands fa-linkedin-in fa-2xl ms-3"></i></Link>
              <Link><i class="fa-brands fa-twitter fa-2xl ms-3"></i></Link>
              <Link><i class="fa-brands fa-facebook fa-2xl ms-3"></i> </Link>

            </div>
          </div>
        </div>
      </div>
      <p className='mt-5 text-center'>Copyright &copy; 2023 Project Fair Built with React and Redux</p>

    </div>
  )
}

export default Footer