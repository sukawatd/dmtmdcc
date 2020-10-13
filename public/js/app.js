const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Just Testing')
    console.log('q1 : ' + document.getElementById('q1').value)
    console.log('q2 : ' + document.getElementById('q2').value)
    console.log('q3 : ' + document.getElementById('q3').value)
    console.log('q4 : ' + document.getElementById('q4').value)
    console.log('q5 : ' + document.getElementById('q5').value)
    console.log('q6 : ' + document.getElementById('q6').value)
    console.log('q7 : ' + document.getElementById('q7').value)
    console.log('q8 : ' + document.getElementById('q8').value)
    console.log('q9 : ' + document.getElementById('q9').value)
    console.log('q10 : ' + document.getElementById('q10').value)
    console.log('q11 : ' + document.getElementById('q11').value)
    console.log('q12 : ' + document.getElementById('q12').value)
    console.log('q13 : ' + document.getElementById('q13').value)
    console.log('q14 : ' + document.getElementById('q14').value)
    console.log('q15 : ' + document.getElementById('q15').value)
    console.log('q16 : ' + document.getElementById('q16').value)
    console.log('q17 : ' + document.getElementById('q17').value)
    // load image to img id output
    const file = document.getElementById('q15').files[0];
    const img = document.getElementById('output')
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
        img.src = event.target.result
    })

    reader.readAsDataURL(file)

    
    return
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    })