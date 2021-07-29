import { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import actions from '../api'
import Button from "@material-ui/core/Button";

function AddPost(props) {

    let [post, setPost] = useState('')
    let history = useHistory()

    const handleChange = e => {
        setPost(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let res = await actions.addPost({ post })
        history.push('/home') //props.history.push is also an option
    }

    return (
        <div>
            <h3>Add Comment</h3>
            {/* <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} placeholder="Enter a post" />
                <Button variant="contained" 
                style={{
                  backgroundColor: 'rgb(75,105,40)',
                  color: 'white',
                  borderRadius: '40px'
                }} >
                Leave Event
              </Button>
            </form> */}
        </div>
    );
}

export default AddPost;