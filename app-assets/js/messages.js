const loadMessages = () => {
    fetch('https://spcc-backend.herokuapp.com/api/messages', {
        headers: {
            'x-auth-token': localStorage.token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        data.map(message => {
            message.datetime =  new Date(message.date).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
            document.querySelector('#messages-container').innerHTML += `<div class="col s12 m4 l4">
                <div class="card animate fadeLeft">
                    <div class="card-content">
                        <h6 class="mb-0 mt-0 display-flex justify-content-between">${message.name}<i
                                class="material-icons float-right"></i>
                        </h6>
                        <p style='font-weight: bold' >${message.datetime}</p>
                        <span>${message.userMessage}</span>
                        <button data-id=${message._id} onclick='removeMessage(this)' style='display: block; width: 100%; border: none; background-color: #ff4081; border-radius: 3px; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)'>Remove</button>
                    </div>  
                </div>
            </div>`
        })
    })
    .catch((error) => console.log(error))
    // let response = await fetch('https://spcc-api.herokuapp.com/api/messages');
    // let data = await response.json()
    
}

const removeMessage = (message) => {
    const messageID = message.dataset.id
    const card = message.parentElement.parentElement.parentElement;

    fetch(`https://spcc-backend.herokuapp.com/api/messages/${messageID}`, { 
        method: 'DELETE',
        headers: {
            'x-auth-token': localStorage.token
        }
    })
    .then((res) => res.json())
    .then((data) => console.log(data))

    card.remove()
}

loadMessages()
