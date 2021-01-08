const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    e.preventDefault()
    if (searchElement.value) {
        fetch('/weather?address=' + searchElement.value).then((response)=> {
            response.json().then((data) => {
                if (!data.error) {
                    messageOne.textContent = data.place_name
                    messageTwo.textContent = data.forecast
                } else {
                    messageOne.textContent = data.error
                }
            })
        })
    } else {
        console.log("Please provide a location.")
    }
})
