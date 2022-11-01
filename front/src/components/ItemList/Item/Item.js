import './Item.scss';

export const Item = ({date, title, color, size, number}) => {
  const largeTitle = title.length > 14 ? true : false;
  const largeSize  = title.length > 16 ? true : false;
  const largeColor = color.length > 9 ? true : false;

  return (
    <div className="item">
      <div className="item__content">
        <div className="item__inner-content">
          <p className="item__number">{`№ ${number}`}</p>
          <p className="item__date">{date}</p>
        </div>
        <p className={`item__title ${largeTitle && "item__title_large"}`}>{title}</p>
        {largeSize && <div className='item__color-size-container'>
          <p className="item__size item__size_large">{size}</p>
          <p className="item__color item__color_large">{color.toUpperCase()}</p>
        </div>}
        {!largeSize && <>
          <p className={`item__color ${largeColor && 'item__color_large'}`}>{color.toUpperCase()}</p>
          <p className={`item__size ${largeColor && 'item__size-large'}`}>{size}</p>
        </>}
      </div>
    </div>
  )
}