import React from 'react';
import ReactDOM  from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css'

const Modal = ({ children, onClose , size, xmarkEnable = true, scrollbar= false}) => {
    const portalRoot = document.getElementById('portal-root');

    let customclass = ['modal-container'];
    if(size != ''){
        let _size = "";
        switch(size){
            case 'small':
                _size = "modal-small";
                break;
            case 'medium':
                _size = "modal-medium";
                break;
            case 'fullscreen':
                _size = "modal-fullscreen";
                break;
            default:
                _size = "modal-medium"
                break;
        }
        customclass.push(_size);
    }

    if(scrollbar){
        customclass.push('scrollbar');
    }

    let modal = <React.Fragment>
                    <div className="overlay" onClick={onClose}>
                        <div className={customclass.join(" ")} onClick={(e) => e.stopPropagation()}>
                        {xmarkEnable && <a onClick={onClose} className='modal-xmark'>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" className='custom-xmark' /></a>}
                        {children}
                        </div>
                    </div>
                </React.Fragment>

    return ReactDOM.createPortal(modal, portalRoot);
  };



export default Modal;

