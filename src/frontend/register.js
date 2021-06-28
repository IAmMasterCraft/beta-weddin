//get form
const form = document.querySelector('form');
// const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * emailValidator with regex
 */
const emailValidator = (email) => {
        const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(format) ? true : false;
    } //name validator
const nameCheck = (name) => {
    const result = [];
    const tester = /\d|\./;
    const nameArr = name.split(" ").filter((e) => { return e.trim() != "" });
    nameArr.forEach((name) => {
        result.push(!tester.test(name) && name.length >= 2)
    });
    return result.includes(false) ? false : true;
};
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    //get form values
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const error = document.querySelector('.error')
    const serverError = document.querySelector('.server-response');
    serverError.innerHTML = ""
    if (nameCheck(fullName)) {
        //check if the email is valid
        if (emailValidator(email)) {
            //check if the password matches 
            if (password === confirmPassword) {
                error.innerHTML = ""
                    //make a fetch request to /register
                const result = await fetch('register', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        fullName,
                        email,
                        password
                    })
                });
                const data = await result;
                if (data.status == 200) {
                    const dataBody = await result.json();
                    location.assign(`${dataBody.url}`)
                } else if (data.status == 503) {
                    // const dataBody = await result.json();
                    serverError.innerHTML = `<p>Service is temporary down, we regret every inconvinience this may cause you</p>`
                } else if (data.status == 500) {
                    const dataBody = await result.json();
                    serverError.innerHTML = `<p>${dataBody.message}</p>`
                }
            } else {
                //if password do not match
                error.innerHTML = "<p>Passwords do not match!</p>"
            }
        } else {
            //if email do not match
            error.innerHTML = "<p>please enter a valid email</p>"
        }
    } else {
        //check if the name is above or equal to two characters long
        error.innerHTML = "<p>First name  or last name cannot be an abbreviation</p>"
    }
})


// console.log(email.match(format))