import React from "react";
import 'css/pages/resume.css'

import resumeData from 'data/resumeData'
import ResumeHeader from 'comps/resume/ResumeHeader'
import ResumeSection from 'comps/resume/ResumeSection'

export default function ResumePage() {
  

  return (
    <>
      <ResumeHeader person={resumeData.person}></ResumeHeader>
      <ResumeSection title='Summary' handle='summary' section={resumeData.sections.summary} />
      <ResumeSection title='Experience' handle='experience' section={resumeData.sections.experience} />
      <ResumeSection title='Personal Projects' handle='projects' section={resumeData.sections.projects} />
      <ResumeSection title='Education' handle='education' section={resumeData.sections.education} />
      <ResumeSection title='Skills & Abilities' handle='skills' section={resumeData.sections.skills_abilities} />
    </>);
}