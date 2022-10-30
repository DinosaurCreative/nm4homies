import "./AddItemsForm.scss";
import { useState } from "react";
import { Formik } from 'formik';
import { CFormInput, CForm, CCol, CFormSelect, CButton } from '@coreui/react'
import { initialValue } from "../../utils/constants";
export const AddItemsForm = () => {
  const [values,setValues] = useState(initialValue);

  const submitHandler = e => {
    e.preventDefault();
  }

  const setValHandler = e => {
    setValues((prevVal) => ({
      ...prevVal,
      [e.target.id]: e.target.value
    }))
  }
  return (
      <CForm className="add-items-form" onClick={submitHandler}>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" onChange={setValHandler} id="title" type="text" placeholder="Название"/>
        </CCol>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" onChange={setValHandler} id="color"type="text" placeholder="Цвет"/>  
        </CCol>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" onChange={setValHandler} id="date" type="date" placeholder="дата"/>
        </CCol>
        <CCol md={10}>
          <CFormInput className="add-items-form__input" onChange={setValHandler} id="quantity" type="number" placeholder="количество"/>
        </CCol>
        <CCol md={10}>
          <CFormSelect className="add-items-form__input" onChange={setValHandler} id="size" aria-label="Default select example">
            <option>выбирите размер</option>
            <option value="xxl">XXL</option>
            <option value="xl">XL</option>
            <option value="l">L</option>
            <option value="m">M</option>
            <option value="s">S</option>
            <option value="xs">XS</option>
          </CFormSelect>
        </CCol>
        <CCol md={10}>
          <CButton type="submit"> сохранить </CButton>
        </CCol>
      </CForm>
  )
}

