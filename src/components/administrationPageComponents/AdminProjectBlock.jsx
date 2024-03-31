import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject, postProject, deleteProjectById } from '../../store/slices/projectSlice';
import './AdminProjectBlock.css'

function AdminProjectBlock() {

    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const status = useSelector((state) => state.projects.status);
    const error = useSelector((state) => state.projects.error);

    const [name, setName] = useState('');
    const [stack, setStack] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [projectHref, setProjectHref] = useState('');
    const [githubHref, setGithubHref] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleStackChange = (e) => {
        setStack(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleProjectHrefChange = (e) => {
        setProjectHref(e.target.value);
    };

    const handleGithubHrefChange = (e) => {
        setGithubHref(e.target.value);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postProject({name, stack, image, description, projectHref, githubHref}));
    };

    const handleDelete = (projectID) => {
        dispatch(deleteProjectById(projectID));
    };

    return (
        <div className='adminProjectContainer'>
            <form onSubmit={handleSubmit}>
                <div className='adminProjectHeader'>
                    <h2 className='adminProjectName'>Projects</h2>
                    <button type='submit' className='adminProjectSubmit'>+</button>
                </div>
                <div className='adminProjectInputs'>
                    <div className='adminProjectFirstLine'>
                        <input className='adminProjectInput' type="text" placeholder='Project Name' autoComplete="off" value={name} onChange={handleNameChange} />
                        <input className='adminProjectInput' type="text" placeholder='Stack' autoComplete="off" value={stack} onChange={handleStackChange} />
                        <input className='adminProjectInput' type="text" placeholder='Image Href' autoComplete="off" value={image} onChange={handleImageChange} />
                    </div>
                    <div className='adminProjectSecondLine'>
                        <input className='adminProjectInputCentre' type="text" placeholder='Project Href' autoComplete="off" value={projectHref} onChange={handleProjectHrefChange} />
                        <input className='adminProjectInputCentre' type="text" placeholder='Github Href' autoComplete="off" value={githubHref} onChange={handleGithubHrefChange} />
                    </div>
                    <textarea className='adminProjectThirdLine' type="text" placeholder='Description' autoComplete="off" value={description} onChange={handleDescriptionChange} />
                </div>
            </form>
            <div className='adminProjectList'>
                {projects.map((project) => ( 
                    <div key={project._id} className='adminProjectItem'>
                        <div className='adminItemHeader'>
                            <p className='adminItemName'>{project.name}</p>
                            <button className='adminItemDelete' onClick={() => handleDelete(project._id)}>X</button>
                        </div>
                        <p className='adminItemInfo'>{project.stack}</p>
                        <a className='adminItemHref' href={project.image}>Image Href</a>
                        <p className='adminItemInfo'>{project.description}</p>
                        <a className='adminItemHref' href={project.projectHref}>Project Href</a>
                        <p className='adminItemHrefBottom'><a  href={project.githubHref}>Github Href</a></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProjectBlock;