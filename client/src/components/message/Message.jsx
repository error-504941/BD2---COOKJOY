import React from 'react';
import './Message.css';

const Message = ({children, className, type}) => {
    let customclass = ["message-component"]

    if(className != ""){
        customclass.push(className);
    }
    if(typeof className == "object"){
        customclass = [...customclass, ...className]
    }

    if(type != ''){
        let _type = "";
        switch(type){
            case 'error':
                _type = "message-error";
                break;
            case 'success':
                _type = "message-success";
                break;
            case 'warning':
                _type = "message-warning";
                break;
            default:
                _type = "message-default"
                break;
        }
        customclass.push(_type);
    }
   
    return (
        
        <div className={customclass.join(' ')}>
            {children}
        </div>
    );
};

export default Message;