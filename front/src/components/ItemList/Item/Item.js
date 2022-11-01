import './Item.scss';
import dayjs from '../../../utils/plugins';

export const Item = ({date, title, color, size, number}) => {
  const largeTitle = title.length > 14 ? true : false;
  const LargeSize  = title.length > 16 ? true : false;

  return (
    <div className="item">
      <div className="item__content">
        <div className="item__inner-content">
          <p className="item__number">{`№ ${number}`}</p>
          <p className="item__date">{dayjs(date).format('D MMMM').slice(0,6) +'.'}</p>
        </div>
        <p className={`item__title ${largeTitle && "item__title_large"}`}>{title}</p>
        {LargeSize && <div className='item__color-size-container'>
          <p className="item__size item__size_large">{size}</p>
          <p className="item__color item__color_large">{color.toUpperCase()}</p>
        </div>}
        {!LargeSize && <>
          <p className="item__color">{color.toUpperCase()}</p>
          <p className="item__size">{size}</p>
        </>}
      </div>
    </div>
  )
}