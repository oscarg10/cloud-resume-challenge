import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout.jsx'
import HomePage from 'pages/HomePage.jsx'
import ResumePage from 'pages/ResumePage.jsx'
import ProjectsPage from 'pages/ProjectsPage.jsx'
import ProjectPage from 'pages/ProjectPage.jsx'
import PostPage from 'pages/PostPage.jsx'
import BlogPage from 'pages/BlogPage.jsx'

createRoot(document.querySelector('main')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:handle" element={<ProjectPage />} />
        <Route path="/blog" element={<BlogPage />} />          
        <Route path="/blog/:date/:handle" element={<PostPage />} />
      </Route>
    </Routes>
  </BrowserRouter>)