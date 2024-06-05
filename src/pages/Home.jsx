import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import img1 from '../assets/image1.jpg'
import ProjectCard from '../components/ProjectCards'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'


function Home() {
const [homeProject,setHomeProject] =useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, [])
 const getHomeProject =async()=>{
  const result =await homeProjectAPI()
  console.log(result);
  setHomeProject(result.data)
 }  
 useEffect(()=>{
  getHomeProject();
 },[])
 return (
    <>
      <div className="mb-5 bg-success" style={{ width: '100%', height: '100vh' }}>
        <div className="container-fluid rounded">
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6} lg={6}>
              <h2 className='text-light mb-3' style={{ fontSize: '70px', fontWeight: '600' }}>Project Fair</h2>
              <p className="text-light">One Stop Destinaton for all Web Application projects</p>
              {
                isLoggedIn ?
                  <Link to={"/Dashboard"}>
                    <button className="btn btn-warning">Manage Projects</button>
                  </Link>
                  :
                  <Link to={"/login"}>
                    <button className="btn btn-warning">Get Started</button>
                  </Link>
              }
            </Col>

            <Col sm={12} md={6} lg={6}>
              <img src={img1} alt="title img" style={{ marginTop: '50px', height: '400px' }} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-center">
          <h1 className="">Explore my Projects</h1>
          <marquee scrollAmount={10} >
            <div className="d-flex mt-5 mb-5">
              {
                homeProject.length>0?
                homeProject.map((item)=>(
                <div className="" style={{ width: "400px" }}>
                <ProjectCard project={item} />
              </div>
              
                )):
                <p>No Porjects to load</p>
              }
              
            </div>
          </marquee>
          <div className="text-center mt-3 mb-3">
            <h6><Link to={'/project'}>See more projects</Link></h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home