import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEducation, postEducation } from '../../store/slices/educationSlice';
import './AdminEducationBlock.css'
import { deleteEducationById } from '../../store/slices/educationSlice';

function AdminEducationBlock() {

    const dispatch = useDispatch();
    const educations = useSelector((state) => state.educations.educations);
    const status = useSelector((state) => state.educations.status);
    const error = useSelector((state) => state.educations.error);

    const [timePeriod, setTimePeriod] = useState('');
    const [place, setEducationInstitution] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [description, setDescription] = useState('');

    const handleTimePeriodChange = (e) => {
        setTimePeriod(e.target.value);
    };

    const handleEducationInstitutionChange = (e) => {
        setEducationInstitution(e.target.value);
    };

    const handleSpecializationChange = (e) => {
        setSpecialization(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEducation());
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
        dispatch(postEducation({timePeriod, place, specialization, description}));
    };

    const handleDelete = (educationID) => {
        dispatch(deleteEducationById(educationID));
    };

    return (
        <div className='adminEducationContainer'>
            <form onSubmit={handleSubmit}>
                <div className='adminEducationHeader'>
                    <h2 className='adminEducationName'>Education</h2>
                    <button type='submit' className='adminEducationSubmit'>+</button>
                </div>
                <div className='adminEducationInputs'>
                    <div className='adminEducationTopInputs'>
                        <input className='adminEducationInput' type="text" placeholder='Time Period' autoComplete="off" value={timePeriod} onChange={handleTimePeriodChange} />
                        <input className='adminEducationInput' type="text" placeholder='Education Institution' autoComplete="off" value={place} onChange={handleEducationInstitutionChange} />
                        <input className='adminEducationInput' type="text" placeholder='Specialization' autoComplete="off" value={specialization} onChange={handleSpecializationChange} />
                    </div>
                    <textarea className='adminEducationInputBottom' type="text" placeholder='Description' autoComplete="off" value={description} onChange={handleDescriptionChange} />
                </div>
            </form>
            <div className='adminEducationList'>
                {educations.map((education) => ( 
                    <div key={education._id} className='adminEducationItem'>
                        <div className='adminItemHeader'>
                            <p className='adminItemPlace'>{education.place}</p>
                            <button className='adminItemDelete' onClick={() => handleDelete(education._id)}>X</button>
                        </div>
                        <p className='adminItemInfo'>{education.specialization}</p>
                        <p className='adminItemInfo'>{education.timePeriod}</p>
                        <p className='adminItemText'>{education.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEducationBlock;