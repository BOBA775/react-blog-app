
import { useState } from 'react';
import {
  Heart,
  Clock3,
  CalendarDays,
  UserRound
} from 'lucide-react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    post.id === 1 ? 12 : 6
  );

  function toggleLike() {
    setLiked((wasLiked) => {
      setLikes((count) => count + (wasLiked ? -1 : 1));
      return !wasLiked;
    });
  }

  return (
    <article className="post-card">
      <div className="post-topline">
        <span className="category">{post.category}</span>
        <span className="read-time">
          <Clock3 size={14} />
          {post.readTime}
        </span>
      </div>

      <h2>{post.title}</h2>

      <div className="post-meta">
        <span>
          <UserRound size={15} />
          {post.author}
        </span>
        <span>
          <CalendarDays size={15} />
          {post.date}
        </span>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-bottom">
        <span className="post-note">Thanks for reading!</span>

        <button
          className={`like-button ${liked ? 'liked' : ''}`}
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike this post' : 'Like this post'}
        >
          <Heart
            size={17}
            fill={liked ? 'currentColor' : 'none'}
          />
          <span>{likes}</span>
        </button>
      </div>
    </article>
  );
}
