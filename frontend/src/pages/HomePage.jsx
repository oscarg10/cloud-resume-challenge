
import React from "react";
import 'css/pages/home.css'
import oscar_gordillo from 'images/oscar-gordillo.jpg'
import resumeData from 'data/resumeData'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import VisitorCounter from 'comps/VisitorCounter'

export default function HomePage() {
  const person = resumeData.person;
  const contact = person.contact;
  
  // Manual description - edit this text as needed
  const description = "Cloud security consultant, developer, and data analyst specializing in cybersecurity assurance, cloud platforms, and analytics-driven solutions.";
  
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-name">{person.name}</h1>
        <p className="home-description">{description}</p>
      </div>
      <div className="profile_picture">
        <img src={oscar_gordillo} alt={person.name} />
      </div>
      <div className="contact-buttons">
        {contact.email && (
          <a 
            href={`mailto:${contact.email}`} 
            className="contact-btn email-btn"
            aria-label="Email"
            title="Email"
          >
            <Mail size={24} />
          </a>
        )}
        {contact.linkedin && (
          <a 
            href={contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-btn linkedin-btn"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        )}
        {contact.github && (
          <a 
            href={contact.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-btn github-btn"
            aria-label="GitHub"
            title="GitHub"
          >
            <FaGithub size={24} />
          </a>
        )}
      </div>
      <VisitorCounter />
    </div>
  )
}
