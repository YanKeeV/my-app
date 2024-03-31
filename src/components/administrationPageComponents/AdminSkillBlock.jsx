import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkill, postSkill, deleteSkillById } from '../../store/slices/skillSlice';
import './AdminSkillBlock.css'

function AdminSkillBlock() {

    const dispatch = useDispatch();
    const skills = useSelector((state) => state.skills.skills);
    const status = useSelector((state) => state.skills.status);
    const error = useSelector((state) => state.skills.error);

    const [name, setSkill] = useState('');
    const [description, setDescription] = useState('');

    const handleSkillChange = (e) => {
        setSkill(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postSkill({name, description}));
    };

    const handleDelete = (skillID) => {
        dispatch(deleteSkillById(skillID));
    };

    return (
        <div className='adminSkillContainer'>
            <form onSubmit={handleSubmit}>
                <div className='adminSkillHeader'>
                    <h2 className='adminSkillName'>Skills</h2>
                    <button type='submit' className='adminSkillSubmit'>+</button>
                </div>
                <div className='adminSkillInputs'>
                    <input className='adminSkillInput' type="text" placeholder='Skill' autoComplete="off" value={name} onChange={handleSkillChange} />
                    <input className='adminSkillDescInput' type="text" placeholder='Description' autoComplete="off" value={description} onChange={handleDescriptionChange} />
                </div>
            </form>
            <div className='adminSkillList'>
                {skills.map((skill) => ( 
                    <div key={skill._id} className='adminSkillItem'>
                        <div className='adminItemHeader'>
                            <p className='adminItemName'>{skill.name}</p>
                            <button className='adminItemDelete' onClick={() => handleDelete(skill._id)}>X</button>
                        </div>
                        <p className='adminItemDesc'>{skill.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSkillBlock;