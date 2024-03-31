import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience } from '../../store/slices/experienceSlice';
import './ExperienceBlock.css'

function ExperienceBlock() {

    const dispatch = useDispatch();
    const experiences = useSelector((state) => state.experiences.experiences);
    const status = useSelector((state) => state.experiences.status);
    const error = useSelector((state) => state.experiences.error);

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

    return (
        <div className='experienceContainer'>
            <h2 className='experienceHeader'>Experience</h2>
            <div className='line'></div>
            <div className='experienceList'>
                {experiences.map((experience) => (
                    <div key={experience._id} className='experienceItem'>
                        <div className='experienceItemLeft'>
                            <p className='experienceDate'>{experience.timePeriod}</p>
                        </div>
                        <div className='experienceItemRight'>
                            <p className='experiencePlaceName'>{experience.place}</p>
                            <p className='experienceSpecialization'>{experience.role}</p>
                            <p className='experienceRole'>{experience.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceBlock;