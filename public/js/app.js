console.log('client side js file is loaded')


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location= search.value
    messageone.textContent= 'Loading....'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            // console.log(data.error)
            messageone.textContent=data.error
        } else {
            // console.log(data)
            messageone.textContent=data.location
            messagetwo.textContent=data.forecast
        }
    })
})

})