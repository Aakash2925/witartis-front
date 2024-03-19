import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { useApiContext } from "../context/GlobalState";
import axios from "axios";
export const AddTask = () => {
  const history = useHistory();
  const [input, setInput] = useState({
    taskName: "",
    assignedTo: "",
    completedDate: "",
    category: "",
    priority: "",
  })
  const { setRenderFlag } = useApiContext();
  const handelChange = (event) => {

    setInput({ ...input, [event.target.name]: event.target.value });
    console.log(input)
    console.log(event.target.name)
    console.log(event.target.value)
  }
  const handelFormSubmit = async (event) => {
    event.preventDefault()
    let data = validate(input)
    if (data.status) {
      await axios.post('http://localhost:4000/api/task/createTask', input, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status == '200') {
          history.push("/");
          setRenderFlag()
          handleClose()
        }
        else {
          toast.error(res.msg)
        }
      })
    }
    else {
      toast.error(validate(input).msg)
    }
  }
  const validate = (input) => {
    let tmpError = {}
    tmpError.status = true
    if (!input.taskName) {
      tmpError.msg = 'Task Name Required'
      tmpError.status = false
    }
    else if (!input.assignedTo) {
      tmpError.msg = 'Assigned To Required';
      tmpError.status = false;
    }
    else if (!input.completedDate) {
      tmpError.msg = 'Completed Date Required'
      tmpError.status = false
    }
    else if (!input.category) {
      tmpError.msg = 'category Required'
      tmpError.status = false
    }
    else if (!input.priority) {
      tmpError.msg = 'priority Required'
      tmpError.status = false
    }
    return tmpError
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (<>
    <Button variant="primary" className='edit' onClick={handleShow}>
      ADD TASK
    </Button>

    <Modal show={show} onHide={handleClose} className='mt-5'>

      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row'>
            <div style={{ display: 'inline-block' }} className=' col-md-10 m-auto'>
              <form method="post" role="form" encType="multipart/form-data">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputEmail4">Task Name</label>
                    <input type="text" id="inputEmail4" class="form-control" placeholder="Task Name" onChange={handelChange} name='taskName' />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Assigned To</label>
                    <input type="email" class="form-control" id="inputPassword4" placeholder="assigned To " onChange={handelChange} name='assignedTo' />
                  </div>

                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Completed Date</label>
                    <input type="date" class="form-control" id="inputPassword4" placeholder="Date" onChange={handelChange} name='completedDate' />
                  </div>

                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Category</label>
                    <input type="text" class="form-control" id="inputPassword4" placeholder="category" onChange={handelChange} name='category' />
                  </div>


                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Priority</label>
                    <input type="Number" class="form-control" id="inputPassword4" placeholder="priority" onChange={handelChange} name='priority' />
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button type='text' onClick={handelFormSubmit} variant="primary">
                      Create
                    </Button>
                  </Modal.Footer>
                </div>
                <ToastContainer />
              </form>
            </div>

          </div>
        </div>
      </Modal.Body>

    </Modal>
  </>
  )
}
