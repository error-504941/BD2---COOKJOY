import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddRecipe from './AddRecipe';
import { useAuthContext } from '../context/AuthProvider';
import Modal from '../../components/modal/Modal';
import { deleteItemWithTTL } from '../../utils/localStorage';
import MyRecipe from './MyRecipe';
import {useUserRecipeContext } from '../context/UserRecipeProveder';
const UserBox = () => {
    const {signinData} = useAuthContext();
    const {clearData} = useUserRecipeContext();
    const [openUserSetting, setOpenUserSetting] = useState({
        add: false,
        myrecipe: false
    });

    const onUserSettingHandler = (role) =>{
        switch(role){
            case 'add':
                setOpenUserSetting(prev => {
                    return(
                        {
                            add: true,
                            myrecipe: false
                        }
                    )
                });
                break;
            case  'myrecipe':
                setOpenUserSetting(prev => {
                    return(
                        {
                            add: false,
                            myrecipe: true
                        }
                    )
                });
                break;
            default:
                break;
        }

    }

    const onLogoutHandler = () =>{
        deleteItemWithTTL('user');
        window.location.reload();
    }
    const onCloseAddRecipe =()=>{ 
        clearData();
        setOpenUserSetting(prev => {
                    return(
                        {
                        ...prev,
                        add: false
                        }
        )});
    }
  
    return (
       <React.Fragment>
            <div className="user-box">
                <div className='details-info'>
                    <span>{signinData.username}</span>
                    <div className='userbox-action'>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=> onUserSettingHandler('add')} />
                        <FontAwesomeIcon icon="fa-solid fa-bowl-food"  onClick={()=> onUserSettingHandler('myrecipe')}/>
                        <FontAwesomeIcon icon="fa-solid fa-power-off" className='icon-user' onClick={onLogoutHandler}/>
                    </div>
                </div>
            </div>
            {openUserSetting.add && <Modal  size={"fullscreen"} scrollbar onClose={onCloseAddRecipe}><AddRecipe/></Modal>}
            {openUserSetting.myrecipe && <Modal size={"medium"} scrollbar onClose={()=>{ setOpenUserSetting(prev => {
                            return(
                                {
                                ...prev,
                                myrecipe: false
                                }
                            )});
                         }
                }><MyRecipe/></Modal>}
       </React.Fragment>
    );
};

export default UserBox;