let form = document.querySelector('.form-container form')
let name = document.querySelector('#register-name')
let email = document.querySelector('#register-email')
let password = document.querySelector('#register-password')
let password2 = document.querySelector('#register-password-2')
let userAuth = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    error: null
}

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

                localStorage.setItem('token', data.token)
                userAuth.token = data.token
                userAuth.isAuthenticated = true
                userAuth.error = null

            } else if (!data.token) {

                localStorage.removeItem('token')
                userAuth.isAuthenticated = false
                userAuth.error = data.message
                userAuth.token = null

                name = document.querySelector('#register-name')
                email = document.querySelector('#register-email')
                password = document.querySelector('#register-password')
                password2 = document.querySelector('#register-password-2')
            }
            form.reset()
        })
        
    } 
})

document.querySelector('#trigger').addEventListener('click', () => {
    console.log(userAuth)
    console.log(localStorage)
})