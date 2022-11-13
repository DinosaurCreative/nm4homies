import './AddItemsForm.scss';
import { useEffect, useState , useRef} from 'react';
import { CFormInput, CForm, CCol, CFormSelect, CButton, CFormTextarea, CHeaderBrand } from '@coreui/react';
import { createStickerPack, getAllStickerPacks } from '../../api/api';
import moment from 'moment';
import { initialValue } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const AddItemsForm = ({setStickers, setTokenCheck, setPopupVisible, setMessage, warningMessageHandler}) => {
  const [values, setValues] = useState({
    setTitle: '',
    description: '',
    value: []
  });
  const [setTitleAndDescription, setSetTitleAndDescription] = useState({
    setTitle: '',
    description: '',
  });
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    setMessage('');
  }, []);

  const setValuesHandler = async () => {
    setValues((prev) => {
      return ({
        ...prev,
        setTitle: prev.setTitle ? prev.setTitle : setTitleAndDescription.setTitle,
        description: prev.description ? prev.description : setTitleAndDescription.description,
        value: [...prev.value, currentValue]
      })
    })
  }

  const handleSubmitUntrackedValues = (data, additional, titleNdescription) => {
    let { setTitle, description, value } = data;
    value = additional.title !== '' ? [...value, additional] : value;
    setTitle = titleNdescription.setTitle ? titleNdescription.setTitle : setTitle;
    description = titleNdescription.description ? titleNdescription.description : description;
    return {value, setTitle, description};
  }

  const singleSetSubmitHandler = (date) => {

    createStickerPack({ ...setTitleAndDescription, value: [currentValue], date: date.slice(0,6) + '.'})
    .then(()=> {
      setPopupVisible(true);
      getAllStickerPacks()
      .then(e => {
        setStickers(e.data.data);
        setValues(initialValue);
        navigate('/');
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e))
    .finally(() => setTokenCheck(false))
  }

  const multipleSetsSubmitHandler = (date) => {
      createStickerPack({ ...handleSubmitUntrackedValues(values, currentValue, setTitleAndDescription), date: date.slice(0,6) + '.'})
        .then(()=> {
        setPopupVisible(true);
        getAllStickerPacks()
        .then(e => {
          setStickers(e.data.data);
          setValues(initialValue);
          navigate('/');
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e))
      .finally(() => setTokenCheck(false))
  }

  const submitHandler = async e => {
    e.preventDefault();
    e.stopPropagation();
    if(!values.value.length) {
      if (formRef.current.checkValidity() === false) {
        setValidated(true)
      };
    }
    const date = moment().format('DD MMMM');
    setTokenCheck(true);

    if(!values.value.length) {
      singleSetSubmitHandler(date);
    } else {
      multipleSetsSubmitHandler(date);
    }
  };

  const setCurrentValueHandler = (e) => {
    if(e.target.id === 'setTitle' || e.target.id === 'description') {
      return setSetTitleAndDescription(prev => ({
        ...prev,
        [e.target.id]: e.target.value
      }));
    }

    setCurrentValue(prevVal => ({
      ...prevVal,
      [e.target.id]: e.target.value
    }))
  }

  const addMoreValues = async (e) => {
    if (formRef.current.checkValidity()) {
      setValuesHandler();
      setCurrentValue(initialValue);
      setSetTitleAndDescription({
        setTitle: '',
        description: '',
      })
      setMessage(prev => (
        `${prev} ${currentValue.title} ${currentValue.quantity} шт. ${currentValue.size};   `
      ))
      formRef.current.reset();
      return 
    };
    setValidated(true);
  }

  const inputElement = (requrment, value, id, type, placeholder) => (
    <CCol md={10}>
      <CFormInput className='add-items-form__input' 
                  required={requrment} 
                  value={value} 
                  onChange={setCurrentValueHandler} 
                  id={id} 
                  type={type}
                  placeholder={placeholder}/>
    </CCol>
  )

  return (
    <>
      <CForm md={10}
             className='add-items-form' 
             noValidate
             validated={validated}
             onSubmit={submitHandler}
             id='form'
             ref={formRef}
             >
        <CCol md={10}>
               <CHeaderBrand className='add-items-form__header'>Создание стикеров</CHeaderBrand>
        </CCol>
        {!values.setTitle && inputElement(false, setTitleAndDescription.setTitle, 'setTitle', 'text', 'Название сета')}
        {inputElement(true, currentValue.title, 'title', 'text', 'Название изделия')}
        {inputElement(true, currentValue.color, 'color', 'text', 'Цвет')}
        {inputElement(true, currentValue.quantity, 'quantity', 'number', 'Koличeство')}
        <CCol md={10}>
          <CFormSelect className='add-items-form__input' aria-label='Default select example' 
                       value={currentValue.size} required 
                       onChange={setCurrentValueHandler} 
                       id='size' 
                       >
            <option value=''>Размер</option>
            <option value='3XL'>4XL</option>
            <option value='3XL'>3XL</option>
            <option value='2XL'>2XL</option>
            <option value='XL'>XL</option>
            <option value='L'>L</option>
            <option value='M'>M</option>
            <option value='S'>S</option>
            <option value='XS'>XS</option>
            <option value='2XS'>2XS</option>
            <option value='2XS'>3XS</option>
          </CFormSelect>
        </CCol>
        {!values.description && <CCol md={10}>
          <CFormTextarea
            id='description'
            label='Для заметок'
            rows='3'
            value={setTitleAndDescription.description}
            onChange={setCurrentValueHandler}
            >
          </CFormTextarea>
        </CCol>}
        <CCol md={12} className={'add-items-form__buttons-container'}>
          <CButton color="info" className='add-items-form__button' type='button' onClick={addMoreValues}>добавить</CButton>
          <CButton color="success" className='add-items-form__button' type='submit' >сохранить </CButton>
        </CCol>
      </CForm>
    </>
  );
};

