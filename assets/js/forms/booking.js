document.querySelector('#booking-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#booking-name').value;
    const email = document.querySelector('#booking-email').value;
    const phone = document.querySelector('#booking-phone').value;
    const address = document.querySelector('#booking-address').value;
    const bookingDate = document.querySelector('#booking-datetime').value;
    const message = document.querySelector('#booking-message').value;

    const bookingObj = ({ name, email, phone, address, bookingDate, message })

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

    postBooking('https://spcc-backend.herokuapp.com/api/bookings', bookingObj)
    .then(data => {
        console.log(data); 
    });

    document.querySelector('#booking-form').reset();

})