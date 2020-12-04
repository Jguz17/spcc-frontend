let form = document.querySelector('#register')
let name = document.querySelector('#register-name')
let email = document.querySelector('#register-email')
let password = document.querySelector('#register-password')
let password2 = document.querySelector('#register-password-2')
let loginForm = document.querySelector('#login')
let loginEmail = document.querySelector('#login-email')
let loginPassword = document.querySelector('#login-password')
let loginSubmit = document.querySelector('#login-submit')
let logout = document.querySelector('#logout')

let userAuth = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    error: null
}

// create user
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    
        name = name.value
        email = email.value
        password = password.value
        password2 = password2.value
    
        if (password === password2) {
    
            const user = { name, email, password }
    
            fetch('https://spcc-backend.herokuapp.com/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    console.log(data)
                    localStorage.setItem('token', JSON.stringify(data.token))
                    userAuth.token = data.token
                    userAuth.isAuthenticated = true
                    userAuth.error = null
                    loadUser()
    
                    setTimeout(function(){
                        location.href = "../../admin.html";
                     },100)
                } else if (!data.token) {
    
                    resetFields()
                }
                form.reset()
            })
            
        } else {
            console.log('Passwords do not match')
        }
    })
}

// login user
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()

        loginEmail = loginEmail.value
        loginPassword = loginPassword.value
        
        console.log(loginEmail)
        console.log(loginPassword)
        if (loginEmail && loginPassword) {

            const user = { loginEmail, loginPassword }

            fetch('https://spcc-backend.herokuapp.com/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.loginEmail,
                    password: user.loginPassword
                })
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    userAuth.token = data.token
                    userAuth.isAuthenticated = true
                    userAuth.error = null
                    loadUser()
    
                    setTimeout(function(){
                        location.href = "../../admin.html";
                     },100)
                } else {
                    resetFields()
                }
                loginForm.reset()
            })
        }
    })
} 

// logout user
if (logout) {

    logout.addEventListener('click', () => {
        resetFields()
        setTimeout(function(){
            location.href = "../../pages/Login.html";
         },100)
    })
}
// load user
const loadUser = () => {
    if (localStorage.token) {
        fetch('https://spcc-backend.herokuapp.com/api/auth', {
            headers: {
                'x-auth-token': localStorage.token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            userAuth.user = data
        })
        .catch((error) => {
            resetFields(error)
        }) 
    }
}
// clear fields
const resetFields = (error) => {
    localStorage.removeItem('token')
    userAuth.isAuthenticated = false
    userAuth.error = null
    userAuth.token = null
    userAuth.user = null

    name = document.querySelector('#register-name')
    email = document.querySelector('#register-email')
    password = document.querySelector('#register-password')
    password2 = document.querySelector('#register-password-2')
    loginEmail = document.querySelector('#login-email')
    loginPassword = document.querySelector('#login-password')
}