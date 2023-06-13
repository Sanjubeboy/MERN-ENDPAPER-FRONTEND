import React,{ useState} from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useQueryClient } from 'react-query'


const Edit = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [value, setValue] = useState({
        listName:""
    })
    const handleUpdate = () => {
        console.log(id)
        console.log(value)
        axios.patch(`http://localhost:3500/api/v1/lists/${id}`,value)
        .then(() => {
            queryClient.invalidateQueries('lists')
            navigate('/')

        })
        .catch((err) => console.log(err))


    }

  return (
    <React.Fragment>
        <div className='header'>

        <h1>Update here!!</h1>
        </div>
        <div className='edit-form'>
            {/* <h1>Update here</h1> */}
            <input type='text' value = {value.listName} onChange={(e) => setValue({listName:e.target.value})}/>
            <button onClick={handleUpdate}>Update</button>
        </div>
    </React.Fragment>
  )
}

export default Edit