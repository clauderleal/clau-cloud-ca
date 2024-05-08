import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from '../styles/styles.module.css' // Import the CSS file



function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: '', body: '', published: false });
  const [editingArticleId, setEditingArticleId] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    axios.get("http://54.160.193.20:3000/articles", {
      headers: { Accept: "application/json" }
    })
    .then(response => {
      setArticles(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  };

  const createOrUpdateArticle = () => {
    if (!newArticle.title || !newArticle.body) {
      setError({ message: 'Title and Body are required' });
      return;
    }

    if (editingArticleId) {
      // Update existing article
      axios.put(`http://localhost:4000/articles/${editingArticleId}`, newArticle, {
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      })
      .then(response => {
        const updatedArticles = articles.map(article =>
          article.id === editingArticleId ? response.data : article
        );
        setArticles(updatedArticles);
        setEditingArticleId(null);
        setNewArticle({ title: '', body: '', published: false });
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
    } else {
      // Create new article
      axios.post("http://localhost:4000/articles", newArticle, {
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      })
      .then(response => {
        setArticles([...articles, response.data]);
        setNewArticle({ title: '', body: '', published: false });
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
    }
  };

  const handleEdit = (article) => {
    setEditingArticleId(article.id);
    setNewArticle({ title: article.title, body: article.body, published: article.published });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/articles/${id}`);
      setArticles(articles.filter(article => article.id !== id));
      console.log('Article deleted successfully');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewArticle(prevArticle => ({
      ...prevArticle,
      [name]: newValue
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.card}>
        <input
          type="text"
          placeholder="Title"
          value={newArticle.title}
          onChange={handleInputChange}
          name="title"
        />
        <br/>
        <textarea
          placeholder="Body"
          value={newArticle.body}
          onChange={handleInputChange}
          name="body"
        />
        <br/>
        <label>
          Published:
          <input
            type="checkbox"
            checked={newArticle.published}
            onChange={handleInputChange}
            name="published"
          />
          <br/>
          <br/>
        </label>
        <button onClick={createOrUpdateArticle}>
          {editingArticleId ? 'Update Article' : 'Create Article'}
        </button>
        {error && <div>Error: {error.message}</div>}
      </div>
      {articles.map(item => (
        <div className={styles.card} key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <p>Published: {item.published ? 'Yes' : 'No'}</p>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Article;
