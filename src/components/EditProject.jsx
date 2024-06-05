import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseUrl'
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

    const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    const handleReset = () => {
        setProjectDetails({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
    }
    const handleUpdate = async(e) => {
        e.preventDefault()
        const {title, language, github, website, overview, projectImage, id} = projectDetails;
        if(!title || !language || !github || !website || !overview || !id){
            alert("Please fill the form completely")
        }
        else{
            const reqBody = new FormData();
            reqBody.append("title",title);
            reqBody.append("language",language);
            reqBody.append("github",github);
            reqBody.append("website",website);
            reqBody.append("overview",overview);
            preview?reqBody.append("projectImage",projectImage):
            reqBody.append("projectImage",project.projectImage);
            const token = sessionStorage.getItem("token");
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/formData",
                    "Authorization":`Bearer ${token}`
                }
                const result = await editUserProjectAPI(id, reqBody, reqHeader);
                console.log(result);
                if(result.status === 200){
                  setEditProjectResponse(result)
                  alert("Project updated successfully");
                  handleClose()
              }
              else{
                  alert(result.response.data)
               }
            }
            else{
                const reqHeader = {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
                const result = await editUserProjectAPI(id, reqBody, reqHeader);
                if(result.status === 200){
                  setEditProjectResponse(result)
                  alert("Project updated successfully");
                  handleClose()
              }
              else{
                  alert(result.response.data)
               }
            }
        }
    }
    return (
        <>
            <button className='btn'><i class="fa-solid fa-pen-to-square text-info" onClick={handleShow}></i></button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label htmlFor="projectImageUpload">
                                <input
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                                    type="file" style={{ display: "none" }} id='projectImageUpload' />
                                <img
                                    height={"200px"}
                                    width={"100%"}
                                    src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                            </label>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
                            <div className='w-100 mt-3'>
                                <input
                                    value={projectDetails.title}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                                    type="text" className='form-control' placeholder='Project Title' />
                            </div>
                            <div className='w-100 mt-3'>
                                <input
                                    value={projectDetails.language}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                                    type="text" className='form-control' placeholder='Languages used' />
                            </div>
                            <div className='w-100 mt-3'>
                                <input
                                    value={projectDetails.github}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}
                                    type="text" className='form-control' placeholder='Github URL' />
                            </div>
                            <div className='w-100 mt-3'>
                                <input
                                    value={projectDetails.website}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
                                    type="text" className='form-control' placeholder='Website URL' />
                            </div>
                            <div className='w-100 mt-3'>
                                <textarea
                                    value={projectDetails.overview}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                                    className='form-control' placeholder='Overview' ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update Project
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProject