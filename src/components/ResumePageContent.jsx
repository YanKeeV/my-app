import React from 'react';
import './ResumePageContent.css'
import EducationBlock from './resumePageComponents/EducationBlock';
import ExperienceBlock from './resumePageComponents/ExperienceBlock';
import SkillBlock from './resumePageComponents/SkillsBlock';
import LanguageBlock from './resumePageComponents/LanguageBlock';

function ResumePageContent() {

    return (
        <div className='resumePageContainer'>
            <div className='resumeHead'>
                <h1>Yankiv Nazarii</h1>
                <h2>Fullstack developer</h2>
                <h3>+38(098) 377-66-17, nazar2k10@gmail.com</h3>
                <h3>Kyiv, Ukraine</h3>
            </div>
            <div className='resumeContent'>
                <EducationBlock />
                <ExperienceBlock />
                <SkillBlock />
                <LanguageBlock />
            </div>
        </div>
    );
};

export default ResumePageContent;