import { createContext, useState } from "react"

export const AuthContext = createContext(null)

// AuthProvider: to wrap around other components
// Allow us to keep state and logic definition for each context on their own provider
export default function AuthProvider({children}){
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? {email:localStorage.getItem("currentUserEmail")} : null)
    
    function signUp(email, password){
        // registering a user in a database
        // const users = [] // won't save another user >>> only one user
        // localStorage.getItem("user") >> this is a STRING not an ARRAY >> need to convert
        // if this return nothing, there isn't an empty users, meaning the first time the u user has tried to create a user in this computer
        // >> default it to be an empty array. || []
        
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        console.log("mang users: ", users);
        
        if(users.find((u) => u.email === email)){
            console.log("user already exists");
            
            return {success: false, error: "Email already exists"}
        }
        
        const newUser = {email, password}
        users.push(newUser)

        // you can't just add an object into the local storage. we have to mkae a string version of that
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentUserEmail", email)
        setUser({email})

        // pass this user value to our app
        

        return {success: true}
        // check to see if the user who is trying to sign up already exists in our table before we allow the to sign up
        
    }

    function login(email, password){
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const user = users.find((u)=>u.email === email && u.password === password)

        // if user is NULL
        if (!user) {
            return {success: false, error: "Invalid email or password"}
        }

        localStorage.setItem("currentUserEmail", email)
        setUser({email})

        return {success: true}
    }

    function logout(){
        localStorage.removeItem("currentUserEmail")
        setUser(null)
    }

    return <AuthContext.Provider value={{signUp, user, logout, login}}>{children}</AuthContext.Provider>
}