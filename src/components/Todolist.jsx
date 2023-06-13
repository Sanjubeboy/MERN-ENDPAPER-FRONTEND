import React, {useState} from 'react'
import { useQuery, useQueryClient } from 'react-query'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

const getLists = () => {
    return axios.get(`http://localhost:3500/api/v1/lists`)
}

const Todolist = () => {

    const {isLoading, data} = useQuery('lists', getLists)
    const [newList, setNewList] = useState({
        listName:"",
        status:"not complete"
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()


    // if(!isLoading)
    // {
    //     console.log(data)
    // }

    const handleChange = (e) => {
        setNewList(prev => {
            return {...prev, listName: e.target.value}
        })
    }

    const handleClick = () => {
        console.log(newList)
        axios.post(`http://localhost:3500/api/v1/lists`, newList)
        .then(() => {
            queryClient.invalidateQueries('lists')
        })
    }

    const handleDelete  = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3500/api/v1/lists/${id}`)
        .then(() => {
            queryClient.invalidateQueries('lists')
        })
    }

    const handleCheck = (item) => {
       
        if(item.status === 'not complete')
        {
            item.status = 'complete'
        }
        else{
            item.status = 'not complete'
        }

        axios.patch(`http://localhost:3500/api/v1/lists/${item._id}`, item)
        .then((res) => {
            console.log(res.data)
            queryClient.invalidateQueries('lists')
        })
        .catch((err) => console.log(err))
    }

    const handleEdit = (item) => {
        navigate(`${item._id}`)
    }

  return (
    <React.Fragment>
        <div className='list'>

            <div className='input'>
                <input type='text' value={newList.listName} onChange={handleChange}/>
                <button onClick={handleClick}>Add</button>
            </div>
            <div className='list-container'>
            {
                isLoading?<h1>Loading...</h1>
                :
                data.data.map((item,i) => (
                    <div className='ind-list'>
                        <h2 className={item.status === 'complete'?'completed':'not-complete'}>{i+1}){item.listName}</h2>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <input id='check' onChange={() => handleCheck(item)} type='checkbox'/>
                    </div>
                ))
            }
            </div>
        </div>
      
    </React.Fragment>
  )
}

export default Todolist