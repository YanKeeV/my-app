import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEducation } from '../../store/slices/educationSlice';
import './EducationBlock.css'

function EducationBlock() {

    const dispatch = useDispatch();
    const educations = useSelector((state) => state.educations.educations);
    const status = useSelector((state) => state.educations.status);
    const error = useSelector((state) => state.educations.error);

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

    return (
        <div className='educationContainer'>
            <h2 className='educationHeader'>Education</h2>
            <div className='line'></div>
            <div className='educationList'>
                {educations.map((education) => (
                    <div key={education._id} className='educationItem'>
                        <div className='educationItemLeft'>
                            <p className='educationDate'>{education.timePeriod}</p>
                        </div>
                        <div className='educationItemRight'>
                            <p className='educationPlaceName'>{education.place}</p>
                            <p className='educationSpecialization'>{education.specialization}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationBlock;