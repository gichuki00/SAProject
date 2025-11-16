import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './components/Landing';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import FirebaseDiagnostics from './components/FirebaseDiagnostics';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route path="/recipes" element={<RecipeList />} />
            <Route 
              path="/recipe/:id" 
              element={
                <ProtectedRoute>
                  <RecipeDetail />
                </ProtectedRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/diagnostics" element={<FirebaseDiagnostics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
