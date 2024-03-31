import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../../store/slices/projectSlice';
import './PortfolioPageContent.css'

function PortfolioPageContent() {

    const dispatch = useDispatch();

    const projects = useSelector((state) => state.projects.projects);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProject());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='portfolioContentContainer'>
            <div className='portfolioDescription'>
                This page contains my pet projects, the technologies used in them, and the code. The list will be expanded over time.
            </div>
            <div className='projectList'>
                {projects.map((project) => ( 
                    <div key={project._id} className='projectItem'>
                        <div className='projectItemHeader'>
                            <p className='projectItemName'>{project.name}</p>
                        </div>
                        <img className='projectItemImg' src={project.image} alt="" />
                        <p className='projectItemStack'>{project.stack}</p>
                        <p className='projectItemDesc'>{project.description}</p>
                        <p className='projectItemProjectHref'><a href={project.projectHref}>Project demonstration</a></p>
                        <p className='projectItemGitHref'><a href={project.githubHref}>Github repository</a></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioPageContent;