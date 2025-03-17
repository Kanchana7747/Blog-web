import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Get all articles
  async function getArticles() {
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload);
        setError('');
        extractCategories(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Failed to fetch articles');
    }
  }

  // Extract unique categories from articles
  function extractCategories(data) {
    const uniqueCategories = ['All', ...new Set(data.map((article) => article.category))];
    setCategories(uniqueCategories);
  }

  // Filter articles by category
  function filterByCategory(category) {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((article) => article.category === category));
    }
  }

  // Navigate to specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container">
      {/* Category Filter Dropdown */}
      <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => filterByCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {error.length !== 0 && <p className="display-4 text-center mt-5 text-danger">{error}</p>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {filteredArticles.map((articleObj) => (
          <div className="col" key={articleObj.articleId}>
            <div className="card h-100">
              <div className="card-body">
                {/* Author image and name */}
                <div className="author-details text-end">
                  <img
                    src={articleObj.authorData.profileImageUrl}
                    width="40px"
                    className="rounded-circle"
                    alt=""
                  />
                  <p>
                    <small className="text-secondary">{articleObj.authorData.nameOfAuthor}</small>
                  </p>
                </div>
                {/* Article title */}
                <h5 className="card-title">{articleObj.title}</h5>
                {/* Article content (truncated) */}
                <p className="card-text">{articleObj.content.substring(0, 80) + '....'}</p>
                {/* Read more button */}
                <button className="custom-btn btn-4" onClick={() => gotoArticleById(articleObj)}>
                  Read more
                </button>
              </div>
              <div className="card-footer">
                {/* Last updated date */}
                <small className="text-body-secondary">
                  Last updated on {articleObj.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
