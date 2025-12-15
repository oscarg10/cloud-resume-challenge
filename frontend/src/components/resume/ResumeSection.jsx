import React from "react";
import ResumeSectionItem from 'comps/resume/ResumeSectionItem'

export default function ResumeSection(props) {
  const { section, title, handle } = props;

  return (
    <section className={handle}>
      <h2>{title}</h2>
      <div className="items">
        {section.map((item) => (
          <ResumeSectionItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
