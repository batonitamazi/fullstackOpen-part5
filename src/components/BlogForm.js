import React, { useState } from "react";

function BlogForm({ createBlog, setSuccessMessage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    createBlog(blogObject)
    
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default BlogForm;
