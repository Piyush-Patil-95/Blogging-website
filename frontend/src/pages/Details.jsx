import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from '../utils/api';
import '../css/details.css'
import { IoMdArrowBack } from "react-icons/io";
import { useUser } from "../context/UserContext";



export default function Details() {
  const { user } = useUser();
    const navigate = useNavigate()
    const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
    
    const fetchBlog = async(req,res)=>{
        try {
            const resp = await API.get(`/blogs/${id}`);
            setBlog(resp.data);
            
        } catch (err) {
            console.error('Error fetching blog post data:', err);
        }
        finally {
        setLoading(false);
      }
    }
    useEffect(()=>{
        fetchBlog();
    },[id])


    const handleDelete = async()=>{
        try {
            await API.delete(`/blogs/${id}`)
            navigate('/')
        } catch (err) {
            console.error('Error deleting', err);
        }
    }

    if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;
  return (
      <div>
        <div>
          <IoMdArrowBack className="back-icon mt-4 ml-4" onClick={()=>{navigate('/')}}/>
          <p className='blog-title-font-details' >{blog.title}</p>
        </div>
      
      <div className="container ">
        <div className="row">
          
          <div className="col-lg-6">
          {blog.image && (
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={blog.title}
          style={{ width: "100%", borderRadius: "8px", marginTop: "15px" }}
        />
      )}
          <p className='lead'><strong >Created By: </strong>{blog.createdBy?.name || "Anonymous"}</p>
          </div>
          <div className="col-lg-6 blog-desc">
            <p>{blog.content}</p>
          </div>
        </div>
        {user && user._id === blog.createdBy?._id && (
        <div className='text-center mt-4'>
          <Link to={`/update/${blog._id}`}>
            <button id='update'  type="button" className="btn btn-secondary ">UPDATE</button>
          </Link>
          <Link onClick={handleDelete}>
            <button id='delete'  type="button" className="btn btn-secondary ">DELETE</button>
          </Link>
        </div>
        )}
      </div>
      </div>
  )
}
