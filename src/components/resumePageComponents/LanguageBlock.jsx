import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguage } from '../../store/slices/languageSlice';
import './LanguageBlock.css'

function LanguageBlock() {

    const dispatch = useDispatch();
    const languages = useSelector((state) => state.languages.languages);
    const status = useSelector((state) => state.languages.status);
    const error = useSelector((state) => state.languages.error);

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

    return (
        <div className='languageContainer'>
            <h2 className='languageHeader'>Languages</h2>
            <div className='line'></div>
            <ul className='languageList'>
                {languages.map((language) => (
                    <li className='languageItem'>{language.name} - {language.level}</li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageBlock;