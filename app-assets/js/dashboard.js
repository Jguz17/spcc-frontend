// ---- BOOKINGS ----
async function loadAcceptedBookings() {
    let response = await fetch('https://spcc-api.herokuapp.com/api/v1/accepted_bookings');
    let data = await response.json()
    data.map(booking => {
        booking.datetime =  new Date(booking.datetime).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
        document.querySelector('#booking-list').innerHTML += `<tr data-id=${booking.id}>
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.address}</td>
            <td>${booking.datetime}</td>
            <td id='confirm' class="center-align"><a><i onclick='completeBooking(this)' class="material-icons green-text confirm-booking">check</i></a></td>
            </tr>`
    })
    loadPendingBookings()
}

async function loadPendingBookings() {
    let response = await fetch('https://spcc-api.herokuapp.com/api/v1/bookings')
    let data = await response.json()

    data.length >= 1 ? document.querySelector('#completed-bookings').innerHTML = `${data.length}` : document.querySelector('#completed-bookings').innerHTML = '0'
}

const completeBooking = (booking) => {
    const row = booking.parentElement.parentElement.parentElement;
    const bookingID = row.dataset.id

    fetch(`https://spcc-api.herokuapp.com/api/v1/accepted_bookings/${bookingID}`, { method: 'DELETE'})
    .then((res) => res.json())

    row.remove()

}

loadAcceptedBookings()

// ---- MESSAGES ----
async function loadMessages() {
    let response = await fetch('https://spcc-api.herokuapp.com/api/v1/messages')
    let data = await response.json()

    console.log(data)

    data.map(message => {
        message.datetime =  new Date(message.datetime).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})

        document.querySelector('#messages-list').innerHTML += `<li data-id=${message.id} class="collection-item avatar">
                    <p class="font-weight-600">${message.name}</p>
                    <p class="medium-small">${message.datetime}</p>
                    <a href="#!" class="secondary-content"><i  onclick='removeMessage(this)' class="material-icons">delete</i></a>
                 </li>`
    })
}

const removeMessage = (message) => {
    const li = message.parentElement.parentElement;
    const messageID = li.dataset.id

    fetch(`https://spcc-api.herokuapp.com/api/v1/messages/${messageID}`, { method: 'DELETE'})
    .then((res) => res.json())

    li.remove()
}

loadMessages()

// const d =  new Date(this.props.booking.date_time).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
// console.log(d)