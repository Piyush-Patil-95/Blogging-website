import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../css/Create.css";
import { IoMdArrowBack } from "react-icons/io";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if(image){
      formData.append("image", image);
    }
    try {
      await API.post("/blogs", formData, {
        withCredentials:true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <main className="main-content-wrapper">
      <form onSubmit={handleSubmit}>
        
        <div className="title-row">
          <IoMdArrowBack className="back-icon mb-4 ml-4" onClick={()=>{navigate('/')}}/>
          <h2 className="newfontForCreate mt-2 mb-5">CREATE NEW BLOG</h2>
        </div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-6">
            <div className="center-container">
              <div className="form-floating mb-3 custom-input-field ">
              <input
                value={title}
                type="text"
                className="form-control"
                id="floatingTitle"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="floatingTitle ">Blog Title</label>
            </div>
            </div>
            <div className="center-container">
              <div className="form-floating mb-3 custom-input-field ">
                <textarea
                className="form-control"
                  placeholder="Content"
                  style={{height:'380px'}}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <label htmlFor="floatingContent ">Blog Content</label>
              </div>
            </div>
        </div>
        <div className="col-6">
          <div className="form-floating mb-3 custom-input-field">
            <input
              type="file"
              className="form-control custom-file-input"
              id="floatingImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="floatingImage">Upload Image</label>
          </div>

          {preview && (
            <div className="image-preview mt-3">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow-sm"
                style={{ maxWidth: "70%", borderRadius: "8px" ,marginLeft: '0' }}
              />
            </div>
          )}
        </div>
        </div>
        </div>

        <div className="text-center mt-5">
          <button type="submit text-centre">Submit</button>
        </div>
      </form>
    </main>
  );
}
