import { useState } from 'react';

function CommentSection({ comments, postId, onAddComment }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === '' || comment.trim() === '') {
      setError('Please enter your name and comment.');
      return;
    }

    setError('');
    setSubmitting(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        postId: Number(postId),
        name: name,
        body: comment
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not post comment.');
        }

        return response.json();
      })
      .then((data) => {
        onAddComment(data);

        setName('');
        setComment('');
        setSubmitting(false);
      })
      .catch((error) => {
        console.error('Error posting comment:', error);

        setError('Sorry, your comment could not be posted.');

        setSubmitting(false);
      });
  }

  return (
    <section className="comments-section">

      <div className="section-heading">
        <div>
          <span className="eyebrow">JOIN THE DISCUSSION</span>

          <h2>
            Comments <span className="comment-count">{comments.length}</span>
          </h2>
        </div>
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>

        <h2>Leave a Comment</h2>

        <label htmlFor="comment-name">Name</label>

        <input
          id="comment-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
        />

        <label htmlFor="comment-text">Comment</label>

        <textarea
          id="comment-text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your comment..."
          required
        />

        <div className="form-bottom">

          <span className="character-count">
            Share your thoughts
          </span>

          <button
            className="submit-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Posting...' : 'Submit Comment'}
          </button>

        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

      </form>

      <div className="comment-list">

        {comments.length === 0 && (
          <p>No comments yet. Be the first to comment!</p>
        )}

        {comments.map((item) => (
          <article className="comment" key={item.id}>

            <div className="comment-avatar">
              {item.name.charAt(0).toUpperCase()}
            </div>

            <div className="comment-body">

              <div className="comment-meta">
                <strong>{item.name}</strong>
              </div>

              <p>{item.body}</p>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
}

export default CommentSection;