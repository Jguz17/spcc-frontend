let form = document.querySelector('.form-container form')
let name = document.querySelector('#register-name')
let email = document.querySelector('#register-email')
let password = document.querySelector('#register-password')
let password2 = document.querySelector('#register-password-2')

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
        .then((data) => console.log(data))
    }

    form.reset()
})
