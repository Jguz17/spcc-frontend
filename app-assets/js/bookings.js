const loadBookings = () => {
    fetch('https://spcc-backend.herokuapp.com/api/bookings', {
        headers: {
            'x-auth-token': localStorage.token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        data.map(booking => {
            // booking.datetime =  new Date(booking.datetime).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
            if (booking.confirmed === 'false') {
                // console.log(data)
                if (document.querySelector('#booking-list')) document.querySelector('#booking-list').innerHTML += `<tr data-id=${booking._id}>
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.phone}</td>
                <td>${booking.address}</td>
                <td>${booking.bookingDate}</td>
                <td id='confirm' class="center-align"><a><i onclick='removeBooking(this)' data-id=${booking._id} class="material-icons red-text confirm-booking">close</i></a></td>
                <td id='confirm' class="center-align"><a><i onclick='confirmBooking(this)' data-id=${booking._id} class="material-icons green-text confirm-booking">check</i></a></td>
                </tr>`
            } else if (booking.confirmed === 'true') {
                // console.log(booking)
                if (document.querySelector('#accepted-booking-list')) document.querySelector('#accepted-booking-list').innerHTML += `<tr data-id=${booking._id}>
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.phone}</td>
                <td>${booking.address}</td>
                <td>${booking.bookingDate}</td>
                <td id='confirm' class="center-align"><a><i onclick='removeBooking(this)' data-id=${booking._id} class="material-icons red-text confirm-booking">close</i></a></td>
                </tr>`
            }
        })
    })
}

const removeBooking = (booking) => {
    console.log(booking.dataset.id)
    const bookingID = booking.dataset.id
    const row = booking.parentElement.parentElement.parentElement;
    // console.log(bookingID)
    fetch(`https://spcc-backend.herokuapp.com/api/bookings/${bookingID}`, { 
        method: 'DELETE',
        headers: {
            'x-auth-token': localStorage.token
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))

    row.remove()
}

const confirmBooking = (booking) => {
    const bookingID = booking.dataset.id
    const row = booking.parentElement.parentElement.parentElement;

    fetch(`https://spcc-backend.herokuapp.com/api/bookings/${bookingID}`, { 
        method: 'PUT',
        headers: {
            'x-auth-token': localStorage.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            confirmed: 'true'
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.log(error))

    row.remove()
}

loadBookings()