import { useEffect, useState } from "react";
import API from "../utils/api.js";
import { useNavigate, Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div>
            <h1 className="newfont">BlogSphere</h1>
            <p className="lead tag-line">Your daily dose of insight.</p>
          </div>
        </div>

        <div className="row ">
          {blogs.map((blog, index) => {
            return (
              <div
                className={`col-lg-${index === 1 ? "6" : "3"} `}
                key={blog._id}
              >
                <div className="blog-item ">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    to={`/${blog._id}`}
                  >
                    {blog.image ? (
                      <img
                        src={`http://localhost:5000${blog.image}`}
                        alt="blog"
                      />
                    ) : null}
                  </Link>
                  <h5 className="blog-title-font text-justify">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                      to={`/${blog._id}`}
                    >
                      {blog.title}
                    </Link>
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Link to="/create">
          <div className="float">
            <i className="fa fa-plus my-float"></i>
          </div>
        </Link>
      </div>
    </>
  );
}
