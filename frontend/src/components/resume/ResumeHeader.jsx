import React from "react";

export default function ResumeHeader(props) {
  const person = props.person;
  const contact = props.person.contact;
  return (
    <section className="header">
      <h1>{person.name}</h1>
      <p>
        <span className="email">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </span>
        {contact.linkedin && (
          <>
            <span className="bull">&bull;</span>
            <span className="linkedin">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                {contact.linkedin.replace(/^https?:\/\//, '')}
              </a>
            </span>
          </>
        )}
      </p>
    </section>
  );
}