import './Login.scss'
import { CFormInput, CForm, CCol, CButton, CRow } from '@coreui/react'
import { useState } from 'react'
import { login, setToken } from '../../api/api'

export const Login = ({setIsLogged, setTokenCheck, warningMessageHandler}) => {
  const [pass, setPass] = useState('');
  const onSubmitClick = (e) => {
    e.preventDefault();
    setTokenCheck(true);
    login(pass)
    .then((response) => {
      console.log('Login response:', response.data); // Логируем ответ
      
      // Сохраняем токен из ответа
      const token = response.data.token || response.data.data?.token;
      console.log('Extracted token:', token ? token.substring(0, 20) + '...' : 'NOT FOUND');
      
      if (token) {
        console.log('Saving token to localStorage');
        setToken(token);
        
        // Проверяем, что токен сохранился
        setTimeout(() => {
          const savedToken = localStorage.getItem("authToken");
          console.log('Token verification - saved:', savedToken ? 'YES' : 'NO');
          if (savedToken) {
            console.log('Saved token matches:', savedToken === token);
          }
        }, 100);
      } else {
        console.error('No token in response:', response.data);
      }
      setIsLogged(true);
    })
    .catch((err) => {
      console.error('Login error:', err);
      warningMessageHandler(err.response?.data?.message || 'Ошибка входа');
    })
    .finally(() => setTokenCheck(false));
  }

  return (
    <div className='login'>
      <CForm className='login__form' type='submit' onSubmit={onSubmitClick}>
      <CRow className='mb-3 login__row'>
        <CCol sm={12}>
          <CFormInput className='login__input' required value={pass} type='password' onChange={e => setPass(e.target.value)} placeholder='Пароль' id='inputPassword'/>
        </CCol>
      </CRow>
      <CRow className='mb-3 login__row' >
        <CCol sm={12}>
          <CButton className='mx-auto d-grid gap-2 col-12 mx-auto' sm={12}  type='submit'>Войти</CButton>
        </CCol>
      </CRow>
      </CForm>
    </div>
  );
};