import './Item.scss';
import dayjs from '../../../utils/plugins';

export const Item = ({date, title, color, size, number}) => {
  return (
    <div className="item">
      <div className="item__content">
        <div className="item__inner-content">
          <p className="item__number">{`№ ${number}`}</p>
          <p className="item__date">{dayjs(date).format('D MMMM')}</p>
        </div>
        <p className="item__title">{title}</p>
        <p className="item__color">{color}</p>
        <p className="item__size">{size}</p>
      </div>
    </div>
  )
}