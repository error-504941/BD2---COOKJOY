import React from 'react';
import Button from '../button/Button.jsx'
import Input from '../input/Input.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Search.css'
const Search = ({placeholder, onChange, children, onClick, className, btnClass}) => {

    let customclass = ["search-component"]

    if(className != ""){
        customclass.push(className);
    }
    if(typeof className == "object"){
        customclass = [...customclass, ...className]
    }
    return (
        <div className={customclass.join(' ')}>
            <Input placeholder={placeholder} onChange={onChange} id={'search-input-txt'}/>
            {children && children}
            <Button onClick={onClick} className={btnClass}>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"/>
            </Button>
        </div>
    );
};

export default Search;