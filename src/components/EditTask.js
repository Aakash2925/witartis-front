import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import axios from "axios";
function EditTask(props) {
  const history = useHistory();
  const [input, setInput] = useState(props.data.row)
  const handelChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    console.log(event.target.name)
    console.log(event.target.value)
    console.log(input)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const handelFormSubmit = async (event) => {
    event.preventDefault()
    let data = validate(input)
    if (data.status) {
      await axios.put(`http://localhost:4000/api/task/editTask/${input._id}`, input, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res) {
          handleClose()
          props.reload(true)
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
  useEffect(() => {
    setInput(props.data.row)
  }, [props])

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

  return (
    <>
      <Button variant="primary" className='edit' onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} className='mt-5'>

        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row'>
              <div style={{ display: 'inline-block' }} className=' col-md-10 m-auto'>
                <form method="post" role="form" encType="multipart/form-data">
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputEmail4">Task Name</label>
                      <input type="text" id="inputEmail4" class="form-control" placeholder="Task Name" onChange={handelChange} name='taskName' value={input.taskName} />
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputPassword4">Assigned To</label>
                      <input type="email" class="form-control" id="inputPassword4" placeholder="assigned To " onChange={handelChange} name='assignedTo' value={input.assignedTo} />
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputPassword4">Completed Date</label>
                      <input type="date" class="form-control" id="inputPassword4" placeholder="Date" onChange={handelChange} name='completedDate' value={input.completedDate} />
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputPassword4">Category</label>
                      <input type="text" class="form-control" id="inputPassword4" placeholder="category" onChange={handelChange} name='category' value={input.category} />
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputPassword4">Priority</label>
                      <input type="Number" class="form-control" id="inputPassword4" placeholder="priority" onChange={handelChange} name='priority' value={input.priority} />
                    </div>


                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button type='text' onClick={handelFormSubmit} variant="primary">
                        Update
                      </Button>
                    </Modal.Footer>
                  </div>
                  <ToastContainer />
                </form>
              </div>

            </div>
          </div>
        </Modal.Body >

      </Modal >
    </>
  );
}

export default EditTask;