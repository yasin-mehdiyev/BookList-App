import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom';

const Home = ()=>{

    const [categories, setCategoryState] = useState([]);
    const [books, setBookState] = useState([])

    useEffect(() => {
        getCategory();
        getBooks();
    }, []);

    console.log(categories);
    console.log(books);

    const getCategory=async()=>{
        let res=await axios.get('http://localhost:3000/categories');
        setCategoryState(res.data);
    }

    const getBooks=async()=>{
        let resultBook=await axios.get('http://localhost:3000/books');
        setBookState(resultBook.data);
    }

    const deleteBook = async(id)=>{
        await axios.delete(`http://localhost:3000/books/${id}`);
        getBooks();
    }

    return (
        <div className="container">

            <div className="mt-4">
               <h4 className="mb-3">Home Page</h4>

               <NavLink className="btn btn-primary mb-5" exact to="/books/add">Add Book</NavLink>

               <table class="table border shadow">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Book Author</th>
                            <th scope="col">Book Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((books, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <th scope="row">{books.name}</th>
                                          {
                                             categories.map((cat) => (
                                                 cat.id==books.categoryId?
                                                 <td>{cat.title}</td>:null
                                             ))
                                          }
                                        <td>{books.author}</td>
                                        <td>{books.price} AZN</td>
                                        <td>
                                            <Link className="btn btn-primary mr-3" exact to={`/books/${books.id}`}>View</Link>
                                            <Link className="btn btn-outline-primary mr-3" exact to={`/books/edit/${books.id}`}>Edit</Link>
                                            <Link className="btn btn-danger" onClick={()=>deleteBook(books.id)}>Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


            </div>
            
        </div>
    )
}
export default Home
