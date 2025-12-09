import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Details from "./pages/Details";
import UpdateBlog from "./pages/UpdateBlog";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Access from "./pages/Access";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoutes";
import MyBlogs from "./pages/MyBlogs";
import Pins from "./pages/Pins";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pins" element={<ProtectedRoute><Pins /></ProtectedRoute>} />
          <Route path="/create" element={ 
            <ProtectedRoute>
            <CreateBlog />
            </ProtectedRoute>} />
          <Route path="/:id" element={<Details />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/myblogs" element={<ProtectedRoute><MyBlogs/></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
