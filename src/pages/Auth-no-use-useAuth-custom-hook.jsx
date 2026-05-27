import {useContext, useState} from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'

// redirect user to home page after login successful
// act like a link where it navigates you to a another page 
// but the link is a physical item that you can click on
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [mode, setMode] = useState("signup")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // const {signUp, user, logout, login} = useContext(AuthContext)
  const {signUp, login} = useContext(AuthContext)

  const {
    register, 
    handleSubmit, 
    formState: {errors},
  } = useForm()

  function onSubmit(data){
    setError(null)
    let result
    if(mode === "signup"){
      result = signUp(data.email, data.password)
    } else {
      result = login(data.email, data.password)
    } 
   
    if(result.success){
      // alert("Yey")
      // / means route
      navigate("/")
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {/* {user && <p>User logged in: {user.email}</p>}
          <button onClick={()=>{logout()}}>Log out</button> */}
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              {/*  if got error then render*/}
              {error && <div class="error-message">{error}</div>}
              <div className="form-group">
                  {/* not include for="" here >> because this "for" is reserved word for JS not JSX*/}
                  {/* using htmlFor instead */}
                  <label className="form-label" htmlFor="email">Email</label>
                  <input 
                    className="form-input" 
                    type="email" 
                    id="email" 
                    autoComplete="current-email"
                    {...register("email", {required: "Email is required"})}
                    />

                    {/* to show the message when having errors with email*/}
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>
              <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input 
                  className="form-input" 
                  type="password"  
                  id="password" 
                  autoComplete="current-password"
                  {...register("password",{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be less than 12 characters",
                      },
                      })}
                  />
                  {/* to show the message when having errors with password*/}
                  {errors.password && <span className="form-error">{errors.password.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-large">
                {mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>
          {/* using lobal states in component */}
          <div className="auth-switch">
            {mode === "signup" ? (
               <p>
                Already have an account? {" "}
                <span className="auth-link" onClick={()=>setMode("login")}>Login</span>
              </p>
            ) : (
              <p>
                {" "}
                Don't have an account? {" "}
                <span className="auth-link" onClick={()=>setMode("signup")}>Sign Up</span>
              </p>
            )}
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth