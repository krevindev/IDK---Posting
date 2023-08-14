import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function RegistrationForm({ switchForm, serverURL }) {

    const [state, setState] = useState({});
    const [errorState, setErrorState] = useState({});


    const regFormRef = useRef(null);

    // Register User Function
    async function handleRegister(body) {

        if (body['password'].length <= 8) {
            setErrorState({ ...errorState, passwordErr: 'Password length should be at least 8!' });
            console.log('Must be at least 8')
            return
        }

        // Execute this if there's no initial error
        if (errorState != {}) {
            setErrorState({})
            await axios.post(serverURL + '/register_user', body)
                .then(res => console.log(res))
                .catch(err => {
                    const responseMessage = err.response.data.error;

                    console.log(responseMessage)
                });
        } else {
            console.log("Oops! There's an Error!")
        }

    }

    function handlePWChange(e) {
        const regPasswordInput = e.target.parentElement.querySelector('#reg-password');

        if (regPasswordInput.value.length >= 1) {
            if (regPasswordInput.value.length <= 8) {
                regPasswordInput.classList.add('reg-invalid-input');
                regPasswordInput.classList.remove('reg-valid-input');
            } else {
                regPasswordInput.classList.add('reg-valid-input');
                regPasswordInput.classList.remove('reg-invalid-input');
            }
        } else {
            regPasswordInput.classList.remove('reg-invalid-input');
            regPasswordInput.classList.remove('reg-valid-input');
        }

    }


    useEffect(() => {
        const regFormInputs = regFormRef.current.querySelectorAll('input');

        const handleInputChange = (event) => {
            const inputValue = event.target.value;
            if (inputValue.length > 0) {
                event.target.classList.add('reg-valid-input');
            } else {
                event.target.classList.remove('reg-valid-input');
            }
        };

        regFormInputs.forEach((input) => {
            input.addEventListener('input', handleInputChange);
        });

        // Clean up the event listeners when the component unmounts
        return () => {
            regFormInputs.forEach((input) => {
                input.removeEventListener('input', handleInputChange);
            });
        };
    }, []);

    return (
        <div id='registrationform-container'>
            <form ref={regFormRef}>
                <h1>REGISTER</h1>
                <input id='reg-firstname' name='reg-firstname' type='text' placeholder='First Name' required />
                <input id='reg-lastname' name='reg-lastname' type='text' placeholder='Last Name' required />
                <input id='reg-username' name='reg-username' type='text' placeholder='Username' required />
                <input id='reg-password' name='reg-password' type='password' placeholder='Password' required onChange={e => {
                    handlePWChange(e);
                }} />
                <button id='register-btn' type='submit' onClick={e => {
                    e.preventDefault();
                    const regForm = document.querySelector('#registrationform-container form');

                    const regFirstName = regForm.querySelector('#reg-firstname').value;
                    const regLastName = regForm.querySelector('#reg-lastname').value;
                    const regUsername = regForm.querySelector('#reg-username').value;
                    const regPassword = regForm.querySelector('#reg-password').value;

                    handleRegister({
                        first_name: regFirstName,
                        last_name: regLastName,
                        username: regUsername,
                        password: regPassword
                    })

                }}>Register</button>
                <Link href='/login' onClick={switchForm}>Return to Login</Link>
            </form>
        </div>
    )
}