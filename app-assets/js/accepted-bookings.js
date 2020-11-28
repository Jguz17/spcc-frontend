// ---- bookingS TABLE ----
async function loadBookings() {
    let response = await fetch('https://spcc-api.herokuapp.com/api/v1/accepted_bookings');
    let data = await response.json()
    data.map(booking => {
        booking.datetime =  new Date(booking.datetime).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
        document.querySelector('#booking-list').innerHTML += `<tr data-id=${booking.id}>
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.phone}</td>
            <td>${booking.address}</td>
            <td>${booking.datetime}</td>
            <td class="center-align"><a><i style='color: #ff4081' onclick='removebooking(this)' data-id=${booking.id} class="fas fa-times remove-booking"></i></a></td>
            </tr>`
    })
}

const removebooking = (booking) => {
    const bookingID = booking.parentElement.parentElement.parentElement.dataset.id
    const row = booking.parentElement.parentElement.parentElement;
    
    fetch(`https://spcc-api.herokuapp.com/api/v1/accepted_bookings/${bookingID}`, { method: 'DELETE' })
    .then((res) => res.json())

    row.remove()
}

loadBookings()
