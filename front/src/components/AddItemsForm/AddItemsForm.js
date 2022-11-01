import "./AddItemsForm.scss";
import { useEffect, useState } from "react";
import { CFormInput, CForm, CCol, CFormSelect, CButton, CFormTextarea, CHeaderBrand } from '@coreui/react'
import { createStickerPack, getAllStickerPacks } from '../../api/api';
import moment from 'moment';
import { initialValue } from "../../utils/constants";
import { useNavigate } from 'react-router-dom';

export const AddItemsForm = ({setStickers, setTokenCheck, setPopupVisible, setMessage}) => {
  const [values, setValues] = useState(initialValue);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setMessage('');
  }, [])
  
  const submitHandler = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true)
    const date = moment().format('DD MMMM');
    if (form.checkValidity()) {
      setTokenCheck(true);
      createStickerPack({...values, date: date.slice(0,6) + '.'})
        .then(()=> {
          setPopupVisible(true);
          setTimeout(()=>{
            setPopupVisible(false);
          } , 1000);          
          getAllStickerPacks()
            .then(e => {
              setStickers(e.data.data);
              setValues(initialValue);
              navigate('/');
            })
            .catch(e => console.log(e))
          })
        .catch(e => console.log(e))
        .finally(() => setTokenCheck(false))
    };
  }

  const setValHandler = e => {
    setValues((prevVal) => ({
      ...prevVal,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <>
      <CForm className="add-items-form" 
             noValidate
             validated={validated}
             onSubmit={submitHandler}>
        <CCol md={10}>
               <CHeaderBrand className='add-items-form__header'>Создание стикеров</CHeaderBrand>
        </CCol>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" required value={values.title} onChange={setValHandler} id="title" type="text" placeholder="Название"/>
        </CCol>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" required value={values.color} onChange={setValHandler} id="color"type="text" placeholder="Цвет"/>  
        </CCol>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" required value={values.quantity} onChange={setValHandler} id="quantity" type="number" placeholder="Koличeство"/>
        </CCol>
        <CCol md={10}>
          <CFormSelect className="add-items-form__input" aria-label="Default select example" value={values.size} required onChange={setValHandler} id="size" >
            <option value="">Выберите размер</option>
            <option value="3XL">3XL</option>
            <option value="2XL">2XL</option>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
            <option value="XS">XS</option>
            <option value="2XS">2XS</option>
          </CFormSelect>
        </CCol>
        <CCol md={10}>
          <CFormTextarea
            id="description"
            label="Для заметок"
            rows="3"
            value={values.description}
            onChange={setValHandler}
            >
          </CFormTextarea>
        </CCol>
        <CCol md={10}>
          <CButton  type="submit" > сохранить </CButton>
        </CCol>
      </CForm>
    </>
  )
}

