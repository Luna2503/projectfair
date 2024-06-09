// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import img2 from '../assets/image1.jpg'
// import { Form } from 'react-bootstrap';
// import { loginAPI, registerAPI } from '../services/allAPI';
// import { isAuthTokenContext } from '../context/ContextShare';
import React, { useContext, useState } from 'react'
import img2 from '../assets/image1.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({ register }) {
  const {isAuthToken, setIsAuthToken}= useContext(isAuthTokenContext)
  const registerForm = register ? true : false;
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form completely")
    }
    else {
      const result = await registerAPI(userData);
      if (result.status === 200) {
        alert("User registered successfully")
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        alert(result.response.data)
      }
    }
  }
  const handleLogin = async(e) => {
    e.preventDefault();
    const {email, password} = userData;
    if(!email || !password){
      alert("Please fill the form completely!")
    }
    else{
      const result = await loginAPI(userData)
      console.log(result);
      if(result.status === 200){
        sessionStorage.setItem("existinguser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        setIsAuthToken(true);
        alert("Successfully logged in");
        setUserData({
          email:"",
          password:""
        });
        navigate("/")
      }
      else{
        alert(result.response.data)
      }
    }
  }
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
        <div className='container w-75'>
          <Link to='/' style={{ textDecoration: "none" }}>
            <i class="fa-solid fa-arrow-left me-2"></i>
            Back to home
          </Link>
          <div className='card bg-success p-5 mt-3'>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6'>
                <img src={img2} alt="" width={'100%'} />
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='d-flex align-items-center flex-column text-ligh'>
                  <h2 className='mb-4' style={{ color: "white" }}><i class="fa-brands fa-stack-overflow me-3 ms-5"></i>Project Fair</h2>
                  <h5>
                    {
                      registerForm ? "Sign Up your account" : "Sign into your account"
                    }
                  </h5>
                  <Form className='mt-3'>
                    {
                      registerForm &&
                      <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                          type="text"
                          placeholder="Username"
                        />
                      </Form.Group>
                    }
                    <Form.Group md="4" controlId="validationCustom01">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        type="text"
                        placeholder="Email"
                      />
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom01">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Form>
                  {
                    registerForm ?
                      <div className='text-light'>
                        <button className='btn btn-warning rounded mt-3' onClick={handleRegister}>Register</button>
                        <p className='mt-3'>Already a user? Click here to <Link to={'/login'} style={{ textDecoration: "none" }}>Login</Link></p>
                      </div> :
                      <div className='text-light'>
                        <Link to={'/dashboard'}>
                          <button className='btn btn-warning rounded mt-3' onClick={handleLogin}>Login</button>
                        </Link>

                        <p className='mt-3'>New user? Click here to <Link to={'/register'} style={{ textDecoration: "none" }}>Register</Link></p>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth