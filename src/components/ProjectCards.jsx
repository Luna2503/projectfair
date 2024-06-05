import React from 'react'
import Card from 'react-bootstrap/Card';
// import mediaPlayerImage from '../assets/mediaplayer.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseUrl';
function ProjectCards({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
        <Card style={{ width: '18rem' }} onClick={handleShow}>
      <Card.Img variant="top" src={`${BASE_URL}/uploads/${project?.projectImage}`} height={'150px'} width={'100%'}/>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>
          
        </Card.Text>
      </Card.Body>
    </Card>
        

    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          <Col md={6} lg={6}>
            <img src={`${BASE_URL}/uploads/${project.projectImage}`} alt="" width={'100%'} height={'250px'} />
          </Col>
          <Col md={6} lg={6}>
            <h4>Description</h4>
            <p>{project.overview}</p>
              <p><span className='fw-bolder'>Technologies:</span> {project.language}</p>
          </Col>
          </Row>
          <div className='d-flex mt-3'>
            <a href={project.website} target='_blank' style={{color:"black", fontSize:"25px"}}>
            <i class="fa-solid fa-link ms-3 fs-3"></i></a>
            <a href={project.github} target='_blank' style={{color:"black", fontSize:"25px"}}>
            <i class="fa-brands fa-github ms-3 fs-3"></i></a>
          </div>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default ProjectCards