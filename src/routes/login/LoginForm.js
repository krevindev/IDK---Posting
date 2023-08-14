export default function LoginForm({ switchForm, serverURL }) {
    return (
        <div id='loginform-container'>
            <form>
                <h1>LOGIN</h1>
                <input type='text' placeholder='Username' />
                <input type='password' placeholder='Password' />
                <button id='login-login-btn' type='submit' onClick={e => e.preventDefault()}>LOGIN</button>
                <button id='login-create-account-btn' onClick={switchForm}>Create Account</button>
            </form>
        </div>
    )
}