import React from "react";
import 'css/pages/home.css'
import oscar_gordillo from 'images/oscar-gordillo.jpg'

export default function HomePage() {
  return (
    <>
        <div className="profile_picture">
          <img src={oscar_gordillo} />
        </div>
    </>
  )
}