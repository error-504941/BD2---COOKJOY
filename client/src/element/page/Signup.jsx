import React , { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';
import Message from '../../components/message/Message';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { emailRegex } from '../../utils/regex';
import { useAuthContext } from '../context/AuthProvider';

const Signup = ({
    onSignInCallback,
    onClose,
    modal=false}) => {
        const {SignUpData, SignUpError, loading, fetchSignUp} = useAuthContext();

        const [userCredential, setUserCredential] = useState({
            username: "",
            validity: true
        });


        const [emailCredential, setEmailCredential] = useState({
            email: "",
            validity: true
        });

        const [passwordCredential, setPasswordCredential] = useState({
            password: "",
            validity: true
        });

        const [confirmPasswordCredential, setConfirmPasswordCredential] = useState({
            confirmPassword: "",
            validity: true
        });


        const [visibility, setVisibility] = useState({
            password: false,
            confirmPassword: false
        });

        const onUserHandler = (e) =>{
            setUserCredential(prev=> {
                return(
                    {
                        validity: true,
                        username: e.target.value
                    }
                )
            });
        }
        const onEmailHandler = (e) =>{  
            setEmailCredential(prev => {
                return(
                    {
                        validity: true,
                        email: e.target.value
                    }
                )
            });
        }

        const onPasswordHandler = (e) =>{
            setPasswordCredential(prev => {
                return(
                    {
                        validity: true,
                        password: e.target.value
                    }
                )
            });
        }

        const onConfirmPasswordHandler = (e) =>{
            setConfirmPasswordCredential(prev => {
                return(
                    {
                        validity: true,
                        confirmPassword: e.target.value
                    }
                )
            });
        }

        const onViewConfirmPassword = () =>{
            setVisibility(prev => {
                return(
                    {
                        ...prev,
                        confirmPassword: !prev.confirmPassword
                    }
                )
            });
        }

        const onViewPassword = () =>{
            setVisibility(prev => {
                return(
                    {
                        ...prev,
                        password: !prev.password
                    }
                )
            });
        }


        const onSignUpHandler = () =>{
            //check di verifica 
            let stopRequest = false;

            if(userCredential.username == ""){
                setUserCredential(prev=> {
                    return(
                        {
                            ...prev,
                            validity: false
                        }
                    )
                });
                stopRequest = true;
            }

            if(!emailRegex.test(emailCredential.email)){
                setEmailCredential(prev=> {
                    return(
                        {
                            ...prev,
                            validity: false
                        }
                    )
                });
                stopRequest = true;
            }


            if(passwordCredential.password == "" ){
                setPasswordCredential(prev => {
                    return(
                        {
                            ...prev,
                            validity: false 
                        }
                    )
                });

                stopRequest = true;
            } 
            
            if(confirmPasswordCredential.confirmPassword == ""){
                setConfirmPasswordCredential(prev => {
                    return(
                        {
                            ...prev,
                            validity: false 
                        }
                    )
                });

                stopRequest = true;
            }

            if(passwordCredential.password != confirmPasswordCredential.confirmPassword){
                setPasswordCredential(prev => {
                    return(
                        {
                            ...prev,
                            validity: false 
                        }
                    )
                });

                setConfirmPasswordCredential(prev => {
                    return(
                        {
                            ...prev,
                            validity: false 
                        }
                    )
                });

                stopRequest = true;
            }



            if(stopRequest){
                return;
            }

            //fetch registrazione

            let request = {
                username: userCredential.username,
                email: emailCredential.email,
                password: passwordCredential.password
            }

            fetchSignUp(request);


        }




        const signUp = 
                <React.Fragment>
                    <div className="register-container">
                    {loading && <Loader/>}
                        <div className='register-design'>
                        </div>
                        <div className="register">
                            <h3 className="title">Crea qui il tuo account!</h3>
                            {SignUpError && 
                                <Message type="error" className='user-feedback'>
                                    <span>{SignUpError.message}</span>
                                </Message>
                            }
                            {SignUpData && 
                                <Message type="success" className='user-feedback'>
                                    <span>{SignUpData}</span>
                                </Message>
                            }
                            <div className={`text-input ${!userCredential.validity && "error"}`}>
                                <Input type="text" placeholder="Username"  value={userCredential.username} onChange={onUserHandler}/>
                            </div>
                            <div className={`text-input ${!emailCredential.validity && "error"}`}>
                                <Input type="email" placeholder="Email"  value={emailCredential.email} onChange={onEmailHandler}/>
                            </div>
                            <div className={`text-input ${!passwordCredential.validity && "error"}`}>
                                <Input 
                                    type={visibility.password ? "text": "password"} 
                                    placeholder="Password" 
                                    value={passwordCredential.password} 
                                    onChange={onPasswordHandler}/>
                                    {visibility.password ? 
                                        <span className='eye-icon'>
                                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={onViewPassword} />
                                        </span>   : 
                                          <span className='eye-icon'>
                                            <FontAwesomeIcon icon="fa-solid fa-eye" onClick={onViewPassword} /> 
                                        </span>
                                    }
                            </div>
                            <div className={`text-input ${!confirmPasswordCredential.validity && "error"}`}>
                                <Input 
                                    type={visibility.confirmPassword ? "text": "password"} 
                                    placeholder="Conferma Password"
                                    value={confirmPasswordCredential.confirmPassword} 
                                    onChange={onConfirmPasswordHandler}/>
                                    {visibility.confirmPassword ? 
                                        <span className='eye-icon'>
                                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={onViewConfirmPassword} /> 
                                        </span> : 
                                        <span className='eye-icon'>
                                            <FontAwesomeIcon icon="fa-solid fa-eye" onClick={onViewConfirmPassword} /> 
                                        </span>
                                    }
                            </div>
                            <Button className="login-btn" onClick={onSignUpHandler}>Registrati</Button>
                            <div className="create">
                                Sei già registrato ? 
                                <a href="#" onClick={onSignInCallback}> torna alla login</a>
                                <i></i>
                            </div>
                        </div>
                    </div>
                </React.Fragment>

        return (
            modal ? <Modal size="medium" onClose={onClose}>{signUp}</Modal> : signUp
        );
};

export default Signup;