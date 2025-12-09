import Blog from "../models/Blog.js";

export const createBlog = async(req,res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized: Please login first" });
        }
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        const blog = await Blog.create({ title, content, createdBy: req.user._id, image });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        res.status(400).json({ message: err.message });
    }
}

//read all
export const getBlogs = async(req,res)=>{
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
}

export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user._id }).populate("createdBy", "name");
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching your blogs" });
  }
};

//read one
export const getBlog = async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy", "name mail");
        res.json(blog)
    } catch (err) {
        res.status(404).json({ message: "Blog not found" });
    }
}

export const updateBlog = async(req,res)=>{
    try {
        const b = await Blog.findById(req.params.id);
        if (b.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Not authorized to edit this blog" });
        }
        const { title, content } = req.body;
        const updatedData = { title, content };
        if (req.file) {
            updatedData.image = `/uploads/${req.file.filename}`;
        }
        const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {new:true});
        res.json(blog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deleteBlog = async(req,res)=>{
    try {
        const b = await Blog.findById(req.params.id);
        if (b.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Not authorized to delete this blog" });
        }
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.json({message:"Blog deleted"})
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}