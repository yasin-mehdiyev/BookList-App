import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook=()=>{

    const [state, setstate] = useState({
        name: '',
        categoryId: "",
        author: '',
        price: ''
    });

    const [category, setCategoryState] = useState([])

    useEffect(() => {
        getCategories();
    }, [])

    const {name,categoryId,author,price}=state;

    let history=useHistory();

    const getCategories = async()=>{
        let res = await axios.get('http://localhost:3000/categories');
        setCategoryState(res.data);
    }

    const onChangeInput=(e)=>{
       let data={...state,[e.target.name]:e.target.value.trimStart()};
       setstate(data);
       console.log(data);
    }

    const onSubmitHandler = async (ev)=>{
        ev.preventDefault();
        if(name!=='' && categoryId!='' && author!=='' && price!==''){
            let baseURL='http://localhost:3000/books';
            await axios.post(baseURL,state);
            history.push('/');
        }
        else{
            console.log('no sir');
            toast.warning('Please fill category name field.It is empty!')
        }
        
    }
    return (
        <div className="container">
             <div className="mt-4">
                <h5 className="mb-4">Add Book</h5>
                 
                 <div className="d-flex justify-content-center">
                    <form className="w-50 d-inline-grid" onSubmit={(e)=>onSubmitHandler(e)}>
                        <div class="form-group">
                            <input type="text" class="form-control" name="name" value={name} onChange={(e)=>onChangeInput(e)} placeholder="Please Enter Book Name"/>
                        </div>
                        <select class="form-select form-select-lg custom-prop" name="categoryId" onChange={(e)=>onChangeInput(e)}>
                            {
                                category.map((cat) => (
                                    <option value={cat.id}>{cat.title}</option>
                                ))
                            }
                        </select>

                        <div class="form-group">
                            <input type="text" class="form-control" name="author" value={author} onChange={(e)=>onChangeInput(e)} placeholder="Please Enter Book Author Name"/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="price" value={price} onChange={(e)=>onChangeInput(e)} placeholder="Please Enter Book Price Value"/>
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

export default AddBook
