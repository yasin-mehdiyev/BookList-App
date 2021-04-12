import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom';

const Category = ()=>{

    const [category, setCategory] = useState([]);
    let baseURL='http://localhost:3000/categories';

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        let res = await axios.get(baseURL);
        setCategory(res.data.reverse()); 
    }

    const deleteCategory = async (id) => {
        await axios.delete(baseURL+'/'+id);
        getCategories();
    }


    return (
        <div className="container">
             <div className="mt-4">
                 <h4 className="mb-4">Category List</h4>

                 <NavLink className="btn btn-primary mb-5" exact to="/category/add">Add Category</NavLink>

                    <div className="d-flex justify-content-center">
                        <table class="table border shadow w-75">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                category.map((categories, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{categories.title}</td>
                                        <td>
                                            <Link className="btn btn-outline-primary mr-3" exact to={`/category/edit/${categories.id}`}>Edit</Link>
                                            <Link className="btn btn-danger" onClick={()=>deleteCategory(categories.id)}>Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
             </div>
        </div>
    )
}
export default Category