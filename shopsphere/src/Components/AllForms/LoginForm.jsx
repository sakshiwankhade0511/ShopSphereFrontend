import React, { useState } from 'react'
import "./LoginForm.css"
import {useForm} from "react-hook-form"
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUser, login } from '../../Services/userServices'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const validationSchema = z.object({
    email : z.string().email({message : "Please enter valid email"}),
    password : z.string().min(2 , {message : "Password must be at least 8 characters."})
    })


const LoginForm = () => {
    const [formerror, setFormError] = useState("")
    const location = useLocation();
    console.log(location)
    const { register, handleSubmit , formState: {errors}} = useForm({resolver: zodResolver(validationSchema)});
  
  const onDataSubmit = async (formData) => {

    try {
        await login(formData)

        const {state} = location
        window.location = state ? state.from : "/"
    } catch (err) {
        if(err.message && err.response.status === 400){
                setFormError(err.response.data.message)
            }
    }
    
  };

  if(getUser()){
    return <Navigate to="/"/>
  }

  return (
    <div  className="align_center loginFormPage">
        <form className="loginForm" onSubmit={handleSubmit(onDataSubmit)}>
            <h2>Login Form</h2>
            <div className="formInputs">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="formTextInput" 
                    placeholder="Enter Your email" 
                    {...register("email")}/>
                    {errors.email && 
                            <p className='formErrors'>{errors.email.message}</p>}
                    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="formTextInput" 
                    placeholder="Enter Your password" 
                    {...register("password")}/>
                    {errors.password && 
                            <p className='formErrors'>{errors.password.message}</p>}
                </div>
                {
                    formerror && <p className="formErrors">{formerror}</p>
                }
                <button type="submit" className="searchButton formSubmit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default LoginForm