import "./SignupPage.css";
import user from "../../assets/signup.png";
import {useForm} from "react-hook-form"
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import { getUser, signup } from "../../Services/userServices";
import { Navigate, useNavigate } from "react-router-dom";

const validationSchema = z.object({
    name : z.string().min(2 , {message : "Name should be at least 2 characters"}),
    email : z.string().email({message : "Please enter valid email"}),
    password : z.string().min(2 , {message : "Password must be at least 8 characters."}),
    ConfirmPassword : z.string()
}).refine(data => data.password === data.ConfirmPassword, 
    {message : "Confirm Password does not match Password",
     path : ["ConfirmPassword"]
    })

const SignupPage = () => {
     const [profilePic, setProfilePic] = useState(null);
     const [formerror, setFormError] = useState("")
     const navigate = useNavigate()
     const { register, handleSubmit , formState: {errors}} = useForm({resolver: zodResolver(validationSchema)});

     const onFormSubmit = async (formData) => {
        try {
            await signup(formData, profilePic)
             
            navigate("/")
            }
        catch (err) {
            if(err.message && err.response.status === 400){
                setFormError(err.response.data.message)
            }
        }
     
    } 
    
    if(getUser()){
    return <Navigate to="/"/>
   }

    return (
        <section className='align_center form_page'>
            <form className='loginForm signup_form' onSubmit={handleSubmit(onFormSubmit)}>
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user} id='file-ip-1-preview' />
                    </div>
                    <label htmlFor='file-ip-1' className='searchButton image_label'
                    >
                        Upload Image
                    </label>
                    <input type='file' id='file-ip-1' className='image_input' 
                    onChange={e => setProfilePic(e.target.files[0])}/>
                </div>

                {/* Form Inputs */}
                <div className='formInputs signup_form_input'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            className='formTextInput'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name" , {required: true})}
                        />
                        {errors.name && 
                            <p className='formErrors'>{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='formTextInput'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && 
                            <p className='formErrors'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='formTextInput'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && 
                            <p className='formErrors'>{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='formTextInput'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("ConfirmPassword")}
                        />
                        {errors.ConfirmPassword && 
                            <p className='formErrors'>{errors.ConfirmPassword.message}</p>}
                    </div>

                    <div className='signup_textares_section'>
                        <label htmlFor='deliveryAddress'>Delivery Address</label>
                        <textarea
                            id='deliveryAddress'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                        />
                    </div>
                </div>
                
                {
                    formerror && <p className="formErrors">{formerror}</p>
                }
                <button className='searchButton formSubmit' type='submit'>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
