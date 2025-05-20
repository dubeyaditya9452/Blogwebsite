import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import CategoryPosts from './pages/CategoryPosts';
import Footer from './components/Footer';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<CategoryPosts />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
