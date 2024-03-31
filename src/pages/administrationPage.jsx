import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/slices/authSlice';
import { useNavigate } from "react-router-dom";
import AdminEducationBlock from '../components/administrationPageComponents/AdminEducationBlock';
import AdminExperienceBlock from '../components/administrationPageComponents/AdminExperienceBlock';
import AdminSkillBlock from '../components/administrationPageComponents/AdminSkillBlock';
import AdminLanguageBlock from '../components/administrationPageComponents/AdminLanguageBlock';
import AdminProjectBlock from '../components/administrationPageComponents/AdminProjectBlock';
import './administrationPage.css'

const Administration = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log(token)
    if(token === null){
      navigate('/login');
    }
  }, [token]);

  const handleDelete = () => {
    dispatch(logOut());
  };

  return (
    <div className='administrationContainer'>
        <div className='administrationHeader'>
          <p className='pageName'>Administration</p>
          <button className='logOutButton' onClick={() => handleDelete()}>Log out</button>
        </div>
        <AdminEducationBlock />
        <AdminExperienceBlock />
        <AdminSkillBlock />
        <AdminLanguageBlock />
        <AdminProjectBlock />
    </div>
  );
};

export default Administration;