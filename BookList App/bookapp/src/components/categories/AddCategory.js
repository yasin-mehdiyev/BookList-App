import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory=()=>{

    const [state, setstate] = useState({title:''});

    const {title}=state;

    let history=useHistory();

    const onChangeInput=(e)=>{
       let data={...state,[e.target.name]:e.target.value.trimStart()};
       setstate(data);
    }

    const onSubmitHandler = async (ev)=>{
        ev.preventDefault();
        if(title!==''){
            let baseURL='http://localhost:3000/categories';
            await axios.post(baseURL,state);
            history.push('/category');
        }
        else{
            console.log('no sir');
            toast.warning('Please fill category name field.It is empty!')
        }
        
    }
    return (
        <div className="container">
             <div className="mt-4">
                <h5 className="mb-4">Add Category</h5>
                 
                 <div className="d-flex justify-content-center">
                    <form className="w-50 d-inline-grid" onSubmit={(e)=>onSubmitHandler(e)}>
                        <div class="form-group">
                            <input type="text" class="form-control" name="title" value={title} onChange={(e)=>onChangeInput(e)} placeholder="Enter Category Name"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </form>
                 </div>

                 <ToastContainer
                    autoClose={1500}
                    position="bottom-right"
                 />

             </div>
        </div>
    )
}

export default AddCategory
