import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguage, postLanguage, deleteLanguageById } from '../../store/slices/languageSlice';
import './AdminLanguageBlock.css'

function AdminLanguageBlock() {

    const dispatch = useDispatch();
    const languages = useSelector((state) => state.languages.languages);
    const status = useSelector((state) => state.languages.status);
    const error = useSelector((state) => state.languages.error);

    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLevelChange = (e) => {
        setLevel(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLanguage());
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
        dispatch(postLanguage({name, level, description}));
    };

    const handleDelete = (experienceID) => {
        dispatch(deleteLanguageById(experienceID));
    };

    return (
        <div className='adminLanguageContainer'>
            <form onSubmit={handleSubmit}>
                <div className='adminLanguageHeader'>
                    <h2 className='adminLanguageName'>Languages</h2>
                    <button type='submit' className='adminLanguageSubmit'>+</button>
                </div>
                <div className='adminLanguageInputs'>
                    <div className='adminLanguageTopInputs'>
                        <input className='adminLanguageInput' type="text" placeholder='Language' autoComplete="off" value={name} onChange={handleNameChange} />
                        <input className='adminLanguageInput' type="text" placeholder='Level' autoComplete="off" value={level} onChange={handleLevelChange} />
                    </div>
                    <textarea className='adminLanguageInputBottom' type="text" placeholder='Description' autoComplete="off" value={description} onChange={handleDescriptionChange} />
                </div>
            </form>
            <div className='adminLanguageList'>
                {languages.map((language) => ( 
                    <div key={language._id} className='adminLanguageItem'>
                        <div className='adminItemHeader'>
                            <p className='adminItemName'>{language.name} - {language.level}</p>
                            <button className='adminItemDelete' onClick={() => handleDelete(language._id)}>X</button>
                        </div>
                        <p className='adminItemText'>{language.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminLanguageBlock;