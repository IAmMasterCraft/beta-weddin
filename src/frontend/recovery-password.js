//get form
const form = document.querySelector('form');

// const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * emailValidator with regex
 */
const emailValidator = (email) => {
    const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(format) ? true : false;
}
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    //get form values
    const email = form.email.value;
    const error = document.querySelector('.error')
    const serverError = document.querySelector('.server-response');
    serverError.innerHTML = ""
    console.log(email)
    if (emailValidator(email)) {
        error.innerHTML = ""
            //make a fetch request to /login
        const result = await fetch('recovery-auth-pass', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email
            })
        });
        const data = await result;


        if (data.status == 200) {
            const dataBody = await result.json();
            location.assign(dataBody.url)
        } else if (data.status == 500) {
            const dataBody = await result.json();
            if (dataBody.message.code === 'EDNS') {
                return serverError.innerHTML = `<p>Could not  establish connection, check your network connection and try again</p>`
            }
            console.log(dataBody.message.code === 'EDNS')
            serverError.innerHTML = `<p>${dataBody.message}</p>`
        } else if (data.status == 404) {
            const dataBody = await result.json();
            serverError.innerHTML = `<p>${dataBody.message}</p>`
        }
    } else {
        error.innerHTML = "<p>please enter a valid email</p>"
    }
})


// console.log(email.match(format))