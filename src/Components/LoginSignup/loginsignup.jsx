import React, { useState, useEffect} from 'react'
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const initialValues = {username:"", email:"", password:""}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log(formValues);
            // Here you can put the code to submit the form values to the server
        }
    };
    
    
    useEffect(() => {
        if (isSubmit){
            console.log(formValues);
            // Here you can put the code to submit the form values to the server
            setIsSubmit(false);
        }
    },[isSubmit]);
    

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
        if (!values.username){
            errors.username = "Username is required!"
        }
    
        if (!values.email){
            errors.email = "Email is required!"
        }
        if (!values.password){
            errors.password = "Password is required!"
        }
        return errors;
    };
    
    

    

    return (
        <div className="container">
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre>  */}
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    {action==="Login"?<div></div>:<div className='input'>
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Name' name='username' value={formValues.username} onChange={handleChange}/>
                        {formErrors.username && <div className='error'>{formErrors.username}</div>}
                    </div>}
    
                    <div className='input'>
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder='Email' name='email' value={formValues.email} onChange={handleChange}/>
                        {formErrors.email && <div className='error'>{formErrors.email}</div>}
                    </div>
    
                    <div className='input'>
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' name='password' value={formValues.password} onChange={handleChange}/>
                        {formErrors.password && <div className='error'>{formErrors.password}</div>}
                    </div>
                </div>
                {action==="Sign Up"?<div></div>:<div className='forgot-password'><span>Forgot Password?</span></div>}
                <div className='submit-container'>
                    {action==="Sign Up" && <div className="submit" onClick={()=>{setAction("Login")}}>Login</div>}
                    {action==="Login" && <div className="submit" onClick={()=>{setAction("Sign Up")}}>Sign Up</div>}
                    <button type="submit" className="submit">Submit</button>
                </div>
            </form>
        </div>
    );
    
    
};

export default LoginSignup;
