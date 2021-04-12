import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const DetailsBook = () => {

    const [categories, setCategoryState] = useState([]);
    const [books, setBookState] = useState([])

    let param=useParams();

    const { id } = param;

    useEffect(() => {
        getCategory();
        getBooks();
    }, []);

    console.log(categories);
    console.log(books);

    const getCategory=async()=>{
        let res=await axios.get(`http://localhost:3000/categories`);
        setCategoryState(res.data);
    }

    const getBooks=async()=>{
        let resultBook=await axios.get(`http://localhost:3000/books/${id}`);
        setBookState(resultBook.data);
    }

    return (
        <div className="container">
            <div className="mt-4">
                <h3>Details Book</h3>

                <Link className="btn btn-outline-primary mt-4" exact to="/">Back to home</Link>

                <div className="d-flex justify-content-center">

                    <ul class="list-group w-50 mt-3">
                            <li className="list-group-item">Book Name: <b>{books.name}</b></li>
                                {
                                    categories.map((cat) => (
                                        cat.id==books.categoryId?
                                        <li className="list-group-item">Category Name: <b>{cat.title}</b></li>:null
                                    ))
                                }
                            <li className="list-group-item">Book Author Name: <b>{books.author}</b></li>
                            <li className="list-group-item">Book Price: <b>{books.price} AZN</b></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DetailsBook