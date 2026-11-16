import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load posts.');
        }

        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError('Sorry, the posts could not be loaded.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="page-container">

      <section className="hero">
        <h1>My Blog</h1>
        <p>Thoughts, stories, and everything in between.</p>
      </section>

      <section className="posts-section">

        <div className="section-heading">
          <div>
            <span className="eyebrow">THE LATEST</span>
            <h2>Recent Posts</h2>
          </div>

          <span className="post-count">
            {posts.length} articles
          </span>
        </div>

        {loading && <p>Loading posts...</p>}

        {error && (
          <p className="form-error">{error}</p>
        )}

        {!loading && !error && posts.map((post) => (
          <article className="post-card" key={post.id}>

            <span className="category">Blog Post</span>

            <h2>
              <Link to={`/post/${post.id}`}>
                {post.title}
              </Link>
            </h2>

            <p className="post-content">
              {post.body.substring(0, 120)}...
            </p>

            <Link
              className="text-link"
              to={`/post/${post.id}`}
            >
              Read More →
            </Link>

          </article>
        ))}

      </section>
    </main>
  );
}

export default BlogPostsPage;