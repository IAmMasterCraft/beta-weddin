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
    const password = form.password.value;
    const error = document.querySelector('.error')
    const serverError = document.querySelector('.server-response');
    serverError.innerHTML = ""

    if (emailValidator(email)) {
        error.innerHTML = ""
            //make a fetch request to /login
        const result = await fetch('login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await result;
        if (data.status == 200) {
            const dataBody = await result.json();
            location.assign(`${dataBody.url}`)
        } else if (data.status == 401) {
            const dataBody = await result.json();
            serverError.innerHTML = `<p>${dataBody.message}</p>`
        } else if (data.status == 500) {
            const dataBody = await result.json();
            serverError.innerHTML = `<p>${dataBody.message}</p>`
        } else if (data.status == 404) {
            const dataBody = await result.json();
            serverError.innerHTML = `<p>${dataBody.message}</p>`
        }
    } else {
        error.innerHTML = "<p>please enter a valid email</p>"
    }
})


//login in with gmail
// const logInWithEmail = document.querySelector('.login-with-google');
// logInWithEmail.addEventListener('click', async(e) => {
//     e.preventDefault();
//     console.log(e)
//     const res = await fetch('google/user-consent', { headers: { "Content-Type": "application/json" }, mode: "cors", redirect: 'follow', method: "GET", body: null });
//     // const data = await res.json
//     console.log(res)
//     if (res.status == 200) { location.assign(data.url) } else {
//         location.assign('/login')
//     }

// });