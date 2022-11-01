import './Login.scss'
import { CFormInput, CForm, CCol, CButton, CRow } from '@coreui/react'
import { useState } from 'react'
import { login } from '../../api/api'


export const Login = ({setIsLogged, setTokenCheck, setFail, setPopupVisible}) => {
  const [pass, setPass] = useState('')
 
  const onSubmitClick = (e) => {
    e.preventDefault();
    setTokenCheck(true)
    login(pass)
      .then(() => setIsLogged(true))
      .catch(({response}) => {
        console.log(response.data.message);
        setFail(true);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
          setFail(false);
        }, 2000)
      })
      .finally(() => setTokenCheck(false));
  }
  return (
    <div className='login'>
      <CForm className='login__form' type='submit' onSubmit={onSubmitClick}>
      <CRow className="mb-3 login__row">
        <CCol sm={12}>
          <CFormInput className='login__input' required value={pass} type="password" onChange={e => setPass(e.target.value)} placeholder='Пароль' id="inputPassword"/>
        </CCol>
      </CRow>
      <CRow className="mb-3 login__row" >
        <CCol sm={12}>
          <CButton className='mx-auto d-grid gap-2 col-12 mx-auto' sm={12}  type='submit'>Войти</CButton>
        </CCol>
      </CRow>
      </CForm>
    </div>
  )
}