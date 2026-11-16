import { BrowserRouter, Routes, Route } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import BlogPostsPage from './pages/BlogPostsPage';
import IndividualPostPage from './pages/IndividualPostPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<BlogPostsPage />} />
        <Route path="/post/:postId" element={<IndividualPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;