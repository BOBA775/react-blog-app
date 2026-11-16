import { Link } from 'react-router';
import { BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">
          <span className="brand-icon">
            <BookOpen size={22} />
          </span>

          <span>
            My Blog<span className="brand-dot">.</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}