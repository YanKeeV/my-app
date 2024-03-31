import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { useNavigate } from "react-router-dom";
import './loginPage.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    console.log(token)
    if(token){
      navigate('/administration');
    }
  }, [token]);

  return (
    <div className='loginPageContainer' onSubmit={handleSubmit}>
      <form className='loginForm'>
        <h2 className='loginHeader'>Administration</h2>
        <input className='loginInput' autocomplete="off" type="text" placeholder='Login' name='login' value={username} onChange={handleUsernameChange} />
        <input className='passInput' autocomplete="off" type="password" placeholder='Password' name='password' value={password} onChange={handlePasswordChange} />
        <h3 className='loginError'>{error}</h3>
        <button className='signButton' type='submit'>Sign in</button>
      </form>
    </div>
  );
};

export default Login;