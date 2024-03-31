import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience, postExperience, deleteExperienceById } from '../../store/slices/experienceSlice';
import './AdminExperienceBlock.css'

function AdminExperienceBlock() {

    const dispatch = useDispatch();
    const experiences = useSelector((state) => state.experiences.experiences);
    const status = useSelector((state) => state.experiences.status);
    const error = useSelector((state) => state.experiences.error);

    const [timePeriod, setTimePeriod] = useState('');
    const [place, setPlace] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    const handleTimePeriodChange = (e) => {
        setTimePeriod(e.target.value);
    };

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExperience());
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
        dispatch(postExperience({timePeriod, place, role, description}));
    };

    const handleDelete = (experienceID) => {
        dispatch(deleteExperienceById(experienceID));
    };

    return (
        <div className='adminExperienceContainer'>
            <form onSubmit={handleSubmit}>
                <div className='adminExperienceHeader'>
                    <h2 className='adminExperienceName'>Experience</h2>
                    <button type='submit' className='adminExperienceSubmit'>+</button>
                </div>
                <div className='adminExperienceInputs'>
                    <div className='adminExperienceTopInputs'>
                        <input className='adminExperienceInput' type="text" placeholder='Time Period' autoComplete="off" value={timePeriod} onChange={handleTimePeriodChange} />
                        <input className='adminExperienceInput' type="text" placeholder='Company Name' autoComplete="off" value={place} onChange={handlePlaceChange} />
                        <input className='adminExperienceInput' type="text" placeholder='Role' autoComplete="off" value={role} onChange={handleRoleChange} />
                    </div>
                    <textarea className='adminExperienceInputBottom' type="text" placeholder='Description' autoComplete="off" value={description} onChange={handleDescriptionChange} />
                </div>
            </form>
            <div className='adminExperienceList'>
                {experiences.map((experience) => ( 
                    <div key={experience._id} className='adminExperienceItem'>
                        <div className='adminItemHeader'>
                            <p className='adminItemPlace'>{experience.place}</p>
                            <button className='adminItemDelete' onClick={() => handleDelete(experience._id)}>X</button>
                        </div>
                        <p className='adminItemInfo'>{experience.role}</p>
                        <p className='adminItemInfo'>{experience.timePeriod}</p>
                        <p className='adminItemText'>{experience.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminExperienceBlock;