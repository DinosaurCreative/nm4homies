import "./DescriptionPopup.scss";
import { CCloseButton, CButton } from "@coreui/react";
import Draggable from "react-draggable";
import CIcon from "@coreui/icons-react";
import { cilChevronBottom, cilChevronTop } from "@coreui/icons";
import { useRef } from "react";

export const DescriptionPopup = ({
  message,
  setMessage,
  elements,
  isMinimized,
  setIsMinimized
}) => {
  const dragStartPos = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);
  const buttonClickTimeout = useRef(null);

  const addItem = ({ title, quantity, size, color }, index) => (
    <p
      className="description-popup__container_item"
      key={index + color + size + title}
    >
      №{index + 1} {title} - {color} - {size} - {quantity} шт
    </p>
  );

  const handleDragStart = (e, data) => {
    dragStartPos.current = { x: data.x, y: data.y };
    wasDragged.current = false;
  };

  const handleDrag = (e, data) => {
    const deltaX = Math.abs(data.x - dragStartPos.current.x);
    const deltaY = Math.abs(data.y - dragStartPos.current.y);
    if (deltaX > 5 || deltaY > 5) {
      wasDragged.current = true;
    }
  };

  const handleDragStop = () => {
    setTimeout(() => {
      wasDragged.current = false;
    }, 100);
  };

  const handleButtonClick = e => {
    if (wasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (buttonClickTimeout.current) {
      clearTimeout(buttonClickTimeout.current);
    }

    buttonClickTimeout.current = setTimeout(() => {
      if (!wasDragged.current) {
        if (isMinimized) {
          setIsMinimized(false);
        } else {
          setIsMinimized(true);
        }
      }
    }, 50);
  };

  if (!message && !elements.length) {
    return null;
  }

  return (
    <Draggable
      handle=".description-popup__drag-handle, .description-popup__minimize-btn"
      bounds="body"
      cancel=".description-popup__close-btn"
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <div
        className={`description-popup no-print ${
          !!elements.length && "description-popup__item-list"
        } ${isMinimized && "description-popup__minimized"}`}
      >
        <CButton
          className="description-popup__minimize-btn"
          onClick={handleButtonClick}
          color="transparent"
          size="xs"
          variant="ghost"
          outline="none"
        >
          <CIcon icon={isMinimized ? cilChevronTop : cilChevronBottom} />
        </CButton>
        {!isMinimized && !elements.length && (
          <CCloseButton
            className="description-popup__close-btn"
            onClick={() => setMessage("")}
          />
        )}

        {!isMinimized && (
          <div className="description-popup__container">
            {elements.length ? (
              elements.map((item, index) => addItem(item, index))
            ) : (
              <>
                <p className="description-popup__message">{message}</p>
              </>
            )}
          </div>
        )}

        {!isMinimized && <div className="description-popup__drag-handle"></div>}
      </div>
    </Draggable>
  );
};
