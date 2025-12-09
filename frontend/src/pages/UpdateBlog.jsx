import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
import "../css/Create.css";
import { IoMdArrowBack } from "react-icons/io";


export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  // Fetch existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const resp = await API.get(`/blogs/${id}`);
        setFormData(resp.data);

        if (resp.data.image) {
          setOldImage(`http://localhost:5000${resp.data.image}`);
        }
      } catch (err) {
        console.error("Error fetching blog post data:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle text change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // temporary preview
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);

    // only send if new image selected
    if (file) data.append("image", file);

    try {
      await API.put(`/blogs/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Blog updated successfully!");
      navigate(`/${id}`);
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <main className="main-content-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <IoMdArrowBack className="back-icon mt-4 ml-4" onClick={() => navigate(-1)}/>
            <h2 className="newfont mt-2 mb-5">UPDATE BLOG</h2>
        </div>
        
        <div className="container-fluid">
          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-6">
              <div className="center-container">
                <div className="form-floating mb-3 custom-input-field">
                  <input
                    name="title"
                    value={formData.title}
                    type="text"
                    className="form-control"
                    id="floatingTitle"
                    placeholder="Title"
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingTitle">Blog Title</label>
                </div>
              </div>

              <div className="center-container">
                <div className="form-floating mb-3 custom-input-field">
                  <textarea
                    name="content"
                    className="form-control"
                    placeholder="Content"
                    style={{ height: "380px" }}
                    value={formData.content}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingContent">Blog Content</label>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-6">
              <div className="form-floating mb-3 custom-input-field">
                <input
                  name="image"
                  type="file"
                  className="form-control custom-file-input"
                  id="floatingImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="floatingImage">Upload Image</label>
              </div>

              {/* Show preview if new file selected, else old image */}
              {preview ? (
                <div className="image-preview mt-3">
                  <img
                    src={preview}
                    alt="New Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "70%", borderRadius: "8px", marginLeft: "0" }}
                  />
                </div>
              ) : oldImage ? (
                <div className="image-preview mt-3">
                  <img
                    src={oldImage}
                    alt="Existing Blog"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "70%", borderRadius: "8px", marginLeft: "0" }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <button type="submit" >
            Update
          </button>
        </div>
      </form>
    </main>
  );
}
