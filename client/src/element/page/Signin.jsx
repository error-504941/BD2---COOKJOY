import React, { useEffect, useState } from 'react';
import './style/Signin.css'
import Modal from '../../components/modal/Modal';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { useAuthContext } from '../context/AuthProvider';
import Message from '../../components/message/Message';
const Signin = ({
    onSignUpCallback,
    onClose,
    modal=false}) => {
        const { loading, signinData, signinError, fetchSignIn, clearError } = useAuthContext();

        const [credential, setCredential] = useState({
            username: "",
            password: ""
        });


    useEffect(() =>{
        let timeout = setTimeout(() =>{
            clearError();
        }, 2000);
        return () => {clearTimeout(timeout);}
    }, [signinError]);


    useEffect(() =>{
        if(signinData != null && modal){
            onClose();
        }
    }, [loading]);


    const onUserHandler = (e) =>{
        setCredential(prev=> {
            return(
                {
                    ...prev,
                    username: e.target.value
                }
            )
        });
    }
    const onPasswordHandler = (e) =>{
        setCredential(prev => {
            return(
                {
                    ...prev,
                    password: e.target.value
                }
            )
        });
    }
    const onSignHandler = () =>{

        if(credential.username == '' || credential.password == ''){
            return;
        }

        let req = {
            "username": credential.username,
            "password": credential.password
          }
        fetchSignIn(req);
    }


    const signIn = 
                <React.Fragment>
                    {signinError && 
                       <Message type="error" className='user-feedback'>
                            <span>{signinError.message}</span>
                        </Message>
                    }
                    <div className="container">
                        <div className="design">     ù
                        </div>
                        <div className="login">
                            <h3 className="title">Accedi</h3>
                            <div className="text-input">
                            <Input type="text" placeholder="Username" onChange={onUserHandler} value={credential.username}/>
                            </div>
                            <div className="text-input">
                                <Input type="password" placeholder="Password" onChange={onPasswordHandler} value={credential.password}/>
                            </div>
                            <Button className="login-btn" onClick={onSignHandler}>Login</Button>
                            <a href="#" className="forgot">Forgot username/password</a>
                            <div className="create">
                                Non hai un'account? 
                                <a href="#" onClick={onSignUpCallback}> Crealo qui</a>
                                <i></i>
                            </div>
                        </div>
                    </div>
                    
                </React.Fragment>

    return (
        modal ? <Modal size="small" onClose={onClose}>{signIn}</Modal> : signIn
    );
};

export default Signin;