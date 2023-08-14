import { useEffect, useRef, useState } from 'react';
import '../route_styles/LoginPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

// const serverURL = 'https://idk-server-git-main-batchy-bot.vercel.app'
const serverURL = 'http://localhost:3001';


export default function LoginPage() {

    const [isReg, setIsReg] = useState(false);

    const switchForm = () => {
        isReg ? setIsReg(false) : setIsReg(true)
    }

    return (
        <div id="LoginPage" className='route-page'>

            <div className='loginpage-part'>
                {
                    (isReg) ? <RegistrationForm switchForm={switchForm} serverURL={serverURL} /> : <LoginForm switchForm={switchForm} serverURL={serverURL} />
                }
            </div>
            <div className='loginpage-part'>
                <h1>IDK</h1>
                <p>I really don't know what this is</p>
            </div>
        </div>
    )
}


// function isValidText(text) {
//     function isAllSpaces(str) {
//         for (let i = 0; i < str.length; i++) {
//             if (str[i] !== " ") {
//                 return false;
//             }
//         }
//         return true;
//     }
//     if (text && text !== '' && !isAllSpaces(text)) {
//         return true
//     }
// }



/** Registration Form Component */
