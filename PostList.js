import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
  };

  const handleSave = (post) => {
    if (selectedPost) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    } else {
      setPosts([post, ...posts]);
    }
    setSelectedPost(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      });
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm selectedPost={selectedPost} onSave={handleSave} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
