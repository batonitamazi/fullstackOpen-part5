import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleUpdateLikes = () => {
    const blogToUpdate = {
      ...blog,
      likes: blogLikes + 1,
    }
    setBlogLikes(blogLikes + 1)
    updateBlog(blogToUpdate)
  }
  const [fullInfo, setFullInfo] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const showFullBlog = () => setFullInfo(!fullInfo)
  return (
    <div style={blogStyle}>
      {fullInfo ? (
        <div>
          {blog.title}
          <button onClick={showFullBlog}>hide</button>
          <div>
            <div>{blog.url}</div>
            <div>{blogLikes} <button onClick={handleUpdateLikes}>like</button></div>
            <div>{blog.author}</div>
            <button onClick={() => deleteBlog(blog)}>remove</button>
          </div>
        </div>
      ) : (
        <div>
          {blog.title}
          <button onClick={showFullBlog}>Show</button>
        </div>
      )}
    </div>
  )
}

export default Blog
