import "../css/Home.css";
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function MyBlogs() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyBlogs = async () => {
      try {
        const res = await API.get("/blogs/myblogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching your blogs:", err);
      }
    };

    fetchMyBlogs();
  }, [user, navigate]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div>
            <h1 className="newfont">My Blogs</h1>
          </div>
        </div>
        {blogs.length === 0 ? (
        <p className="text-center text-muted">You haven’t created any blogs yet.</p>
      ) : (
        <div className="row mt-3">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card shadow-sm">
                {blog.image && (
                  <img
                    src={`http://localhost:5000${blog.image}`}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.content.substring(0, 100)}...</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/${blog._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
