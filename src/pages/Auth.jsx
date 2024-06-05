import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img2 from '../assets/image1.jpg'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({ register }) {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
 
  const registerForm = register ? true : false;
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form completely");
    }
    else {
      const result = await registerAPI(userData);
      if (result.status === 200) {
        alert("Successfully register");
        setUserData({
          username: "",
          email: "",
          password: ""
        });
        navigate('/login');
      }
      else {
        alert(result.response.data)
      }
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email, password} = userData;
    if(!email || !password){
      alert("Please fill the form completely");
    }
    else{
      const result = await loginAPI(userData);
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
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
        <div className="w-75 container">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <i class="fa-solid fa-arrow-left me-2"></i>Back to Home
          </Link>
          <div className="card bg-success p-5 mt-3">
            <div className="row align-items-center">
              <div className="col-lg-6 col-mg-6">
                <img className='rounded' src={img2} width={'100%'} alt="" />
              </div>
              <div className="col-lg-6 col-mg-6">
                <div className="d-flex align-items-center flex-column  text-light">
                  <h3><i class="fa-brands fa-stack-overflow me-3"></i>Project fair</h3>
                  <h5>
                    {
                      registerForm ? "Sign Up your account" : "Sign into your account"
                    }
                  </h5>

                  <Form>

                    {
                      registerForm &&
                      <Form.Group className="md-3" controlId="validationCustom01">
                        <Form.Label> User Name</Form.Label>
                        <Form.Control value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="text" placeholder="Username" />
                      </Form.Group>
                    }

                    <Form.Group className="md-3" controlId="validationCustom01">
                      <Form.Label> Email</Form.Label>
                      <Form.Control value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="md-3" controlId="validationCustom01">
                      <Form.Label> Password</Form.Label>
                      <Form.Control value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="password" />
                    </Form.Group>

                  </Form>

                  {
                    registerForm ?
                      <div className="text-light">
                        <button className='btn btn-warning rounded mt-3 ms-3' onClick={handleRegister}>Register</button>
                        <p className='ms-3'>Already a user? Click here to <Link style={{ textDecoration: 'none', color: '#62a1ff' }} to={'/login'}>Login</Link></p>
                      </div> :
                      <div className="text-light">
                          <button className='btn btn-warning rounded mt-3 ms-3' onClick={handleLogin}>Login</button>
                        <p className='ms-3'>New user? Click here to <Link style={{ textDecoration: 'none', color: '#62a1ff' }} to={'/register'}>Register</Link></p>
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