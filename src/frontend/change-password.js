//get form
const form = document.querySelector('form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    //get form values
    const email = document.querySelector('.email').innerHTML.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const error = document.querySelector('.error')

    const serverError = document.querySelector('.server-response');
    serverError.innerHTML = ""
    console.log(password, confirmPassword, email);
    if (password === confirmPassword) {
        const newPassword = password

        error.innerHTML = "";
        //make a fetch request to /recovery-auth-pass endpoint
        const result = await fetch('recovery-auth-pass', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                email,
                newPassword
            })
        });
        const data = await result;
        if (data.status == 200) {
            const dataBody = await result.json();
            alert(dataBody.message)
            location.assign(dataBody.url)
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
        console.log("matched")

    } else {
        error.innerHTML = "<p>Passwords do not match</p>"
    }

})


// console.log(email.match(format))