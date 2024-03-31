import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkill } from '../../store/slices/skillSlice';
import './SkillsBlock.css'

function SkillBlock() {

    const dispatch = useDispatch();
    const skills = useSelector((state) => state.skills.skills);
    const status = useSelector((state) => state.skills.status);
    const error = useSelector((state) => state.skills.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSkill());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='skillContainer'>
            <h2 className='skillHeader'>Skills</h2>
            <div className='line'></div>
            <ul className='skillList'>
                {skills.map((skill) => (
                    <li className='skillItem'>{skill.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillBlock;