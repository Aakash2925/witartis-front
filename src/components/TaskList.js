import React, { useContext, useEffect, useState } from 'react';
import { useApiContext } from "../context/GlobalState";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import  EditTask  from './EditTask';
export const TaskList = () => {
const {render,setRenderFlagFalse} = useApiContext();
  const [task, setTask] = useState([])
  const [reload, setReload] = useState(false)
  useEffect(() => {
    getTask()
    setReload(false)
  }, [reload])
  useEffect(() => {
    getTask()
    setRenderFlagFalse()
  }, [render])
  
  let getTask = async () => {
    await axios.get('http://localhost:4000/api/task/allTask').then((res) => {
      console.log(res)
      if (res?.data?.result.length > 0) {
       let  dataWithId = res.data.result.map((item, index) => {
          item.id = index + 1
          return item
        })
        setTask(dataWithId)
      }
      else{
        setTask([])
      }
    })
  }


  const renderReload = (value) => {
    setReload(value)
  }

  const columns = [
    {
      field: 'taskName',
      headerName: 'TASK NAME',
      width: 150,
      editable: false,
    },

    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      width: 150,
      editable: false,
    },

    {
      field: 'completedDate',
      headerName: 'Completed Date',
      width: 150,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
      editable: false,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 200,
      editable: false,
    },
    {
      field: 'student_id',
      headerName: 'EDIT',
      width: 130,
      editable: false,
      renderCell: (params) => {
        return (
          <>
           { <EditTask data={params} reload={renderReload} />}
        </>
        );
      }
    },
    {
      field: '_id',
      headerName: 'DELETE',
      width: 130,
      editable: false,
      renderCell: (params) => (
        <>
          <button  className='btn btn-danger' onClick={async () => {
             await axios.post(`http://localhost:4000/api/task/deleteTask/${params.value}`).then((res) => {})
            setReload(!reload)
          }}>DELETE</button>
        </>
      )
    }
  ];
  return (
    <>
      {task.length > 0 ?
        <DataGrid
          rows={task}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[3,5,10,]}
        /> : <h4 className="text-center">No Task</h4>
      }
    </>

  )
}
