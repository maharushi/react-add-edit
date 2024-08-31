import React, { useState, useEffect } from "react";
import axios from "axios";

const PostForm = ({ selectedPost, onSave }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      body,
      userId: 1, // Assuming a static userId
    };

    if (selectedPost) {
      // Update post
      axios
        .put(
          `https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`,
          post
        )
        .then((response) => {
          onSave(response.data);
        });
    } else {
      // Create new post
      axios
        .post("https://jsonplaceholder.typicode.com/posts", post)
        .then((response) => {
          onSave(response.data);
        });
    }

    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">{selectedPost ? "Update" : "Create"}</button>
    </form>
  );
};

export default PostForm;
