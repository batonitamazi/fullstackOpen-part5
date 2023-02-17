import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault()
    console.log(title, author, url)
    const blogObject = {
      title, author, url
    }
    blogService.create(blogObject)
      .then( returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      setTitle("")
      setAuthor("")
      setUrl("")
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wront Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  const loginForm = () => {
    return (
      <div>
        <h2>Log in To application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };
  return (
    <div>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>log out</button>
          </p>
          <div>
            <h2>Create new</h2>
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
                <input
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button type="submit">save</button>
            </form>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
