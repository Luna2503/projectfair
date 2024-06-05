import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import Myprojects from '../components/MyProjects'


function Dashboard() {
  const [userName, setUserName] = useState("");
  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const existingUserData=JSON.parse(sessionStorage.getItem("existinguser"));
      setUserName(existingUserData.username)

    }
  })
  return (
    <>
    <Header dashboard = {'dashboard'}/>
    <h2 className='mt-5 ms-3'>Welcome <span style={{color:"tomato"}}>{userName}</span></h2>

    <Row className=''>
      <Col md={8} lg={8}>
      <Myprojects />
      </Col>
      <Col md={4} lg={4}>
      <Profile />
      </Col>
    </Row>
    
    </>
  )
}

export default Dashboard