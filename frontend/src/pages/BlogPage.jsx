import React from "react";
import 'css/pages/home.css'
import blogData from 'data/blogData.json'
import PostItem from 'comps/PostItem'

export default function BlogPage() {
  const sortedBlogData = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <h1>Oscar Gordillo's Blog</h1>
      <section className='posts'>
        <h2>Recent Posts</h2>
        {sortedBlogData.map((post) => (
          <PostItem key={post.handle} post={post} />
        ))}
      </section>
    </>
  )
} 