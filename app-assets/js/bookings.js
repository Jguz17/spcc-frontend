// ---- PENDING BOOKING TABLE ----

async function loadBookings() {
    let response = await fetch('https://spcc-api.herokuapp.com/api/v1/bookings');
    let data = await response.json()
    data.map(booking => {
        booking.datetime =  new Date(booking.datetime).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
        document.querySelector('#booking-list').innerHTML += `<tr data-id=${booking.id}>
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.phone}</td>
            <td>${booking.address}</td>
            <td>${booking.datetime}</td>
            <td class="center-align"><a><i style='color: #ff4081' onclick='removeBooking(this)' data-id=${booking.id} class="fas fa-times remove-booking"></i></a></td>
            <td id='confirm' class="center-align"><a><i onclick='confirmBooking(this)' class="material-icons green-text confirm-booking">check</i></a></td>
            </tr>`
    })
}

const removeBooking = (booking) => {
    const bookingID = booking.parentElement.parentElement.parentElement.dataset.id
    const row = booking.parentElement.parentElement.parentElement;
    
    fetch(`https://spcc-api.herokuapp.com/api/v1/bookings/${bookingID}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => console.log(data))

    row.remove()
}

const confirmBooking = (booking) => {
    const bookingID = booking.parentElement.parentElement.parentElement.dataset.id
    const row = booking.parentElement.parentElement.parentElement;

    fetch(`https://spcc-api.herokuapp.com/api/v1/bookings/${bookingID}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        // const { address, datetime, email, message, name, phone, user_id } = data;
        async function postBooking(url, obj) {
            const response = await fetch(url, {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            return response.json(); 
        }

        postBooking('https://spcc-api.herokuapp.com/api/v1/accepted_bookings', data)
        .then(data => {
            console.log(data); 
        });
    })

    fetch(`https://spcc-api.herokuapp.com/api/v1/bookings/${bookingID}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => console.log(data))

    row.remove()
}

// ---- CREATE BOOKING FORM ----

document.querySelector('#create-booking-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
    const datetime = document.querySelector('#datetime').value;

    const bookinObj = ({ user_id: 1, name, email, phone, address, datetime })

    async function createBooking(url, obj) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        return res.json()
    }

    createBooking('https://spcc-api.herokuapp.com/api/v1/bookings', bookinObj)
    .then(data => {
        console.log(data)
        document.querySelector('#booking-list').innerHTML += `<tr data-id=${data.id}>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.address}</td>
        <td>${data.datetime}</td>
        <td class="center-align"><a><i style='color: #ff4081' onclick='removeBooking(this)' data-id=${data.id} class="fas fa-times remove-booking"></i></a></td>
        <td id='confirm' class="center-align"><a><i style='color: #ff4081' onclick='confirmBooking(this)' class="material-icons green-text confirm-booking">check</i></a></td>
        </tr>`
    })

    
    

})

loadBookings()
