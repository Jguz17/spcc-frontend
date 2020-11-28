{/* <div class="col s12 m4 l4">
                <div class="card animate fadeLeft">
                    <div class="card-content">
                        <h6 class="mb-0 mt-0 display-flex justify-content-between">Pending Bookings <i
                                class="material-icons float-right"></i>
                        </h6>
                        <p>some text</p>
                        
                    </div>
                </div>
            </div> */}

            // --------


// ---- MESSAGES ----
async function loadMessages() {
    let response = await fetch('https://spcc-api.herokuapp.com/api/v1/messages');
    let data = await response.json()
    data.map(message => {
        message.datetime =  new Date(message.datetime).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})
        document.querySelector('#messages-container').innerHTML += `<div class="col s12 m4 l4">
            <div class="card animate fadeLeft">
                <div class="card-content">
                    <h6 class="mb-0 mt-0 display-flex justify-content-between">${message.name}<i
                            class="material-icons float-right"></i>
                    </h6>
                    <p style='font-weight: bold' >${message.datetime}</p>
                    <span>${message.content}</span>
                    <button data-id=${message.id} onclick='removeMessage(this)' style='display: block; width: 100%; border: none; background-color: #ff4081; border-radius: 3px; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)'>Remove</button>
                </div>  
            </div>
        </div>`
    })
}

const removeMessage = (message) => {
    const messageID = message.dataset.id
    const card = message.parentElement.parentElement.parentElement;
    
    fetch(`https://spcc-api.herokuapp.com/api/v1/messages/${messageID}`, { method: 'DELETE' })
    .then((res) => res.json())

    card.remove()
}

loadMessages()
