import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import CommentSection from '../components/CommentSection';

function IndividualPostPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setPost(null);
    setUser(null);
    setComments([]);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load this post.');
        }

        return response.json();
      })
      .then((postData) => {
        if (!postData.id) {
          throw new Error('Post not found.');
        }

        setPost(postData);

        return Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),

          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        ]);
      })
      .then((responses) => {
        if (!responses[0].ok || !responses[1].ok) {
          throw new Error('Could not load the author or comments.');
        }

        return Promise.all([
          responses[0].json(),
          responses[1].json()
        ]);
      })
      .then((data) => {
        setUser(data[0]);
        setComments(data[1]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading post:', error);
        setError('Sorry, this post could not be loaded.');
        setLoading(false);
      });

  }, [postId]);

  function addComment(newComment) {
    setComments((oldComments) => [...oldComments, newComment]);
  }

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading post...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="page-container">
        <h1>Post Not Found</h1>

        <p className="form-error">
          {error || 'This post does not exist.'}
        </p>

        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="page-container">

      <article className="single-post post-card">

        <span className="category">Blog Post</span>

        <h1>{post.title}</h1>

        {user && (
          <div className="post-meta">
            <span>By {user.name}</span>
            <span>{user.email}</span>
          </div>
        )}

        <p className="post-content">
          {post.body}
        </p>

        <Link to="/">← Back to Blog Posts</Link>

      </article>

      <CommentSection
        comments={comments}
        postId={postId}
        onAddComment={addComment}
      />

    </main>
  );
}

export default IndividualPostPage;