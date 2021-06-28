/**
 * emailValidator with regex
 */
const emailValidator = (email) => {
    const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(format) ? true : false;
};
const mailsChecks = (email) => {
    let validMails = [];
    let errorMails = [];
    email.forEach(mail => {
        const newMail = mail.trim()
        emailValidator(newMail) ? validMails.push(newMail) : errorMails.push(newMail)
    });

    return { validMails, errorMails }
}


//get form
const form = document.querySelector('form');
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const errorMails = [];
    const validMails = [];

    //get form values
    const bridesName = form.bridesName.value;
    const groomsName = form.groomsName.value;
    const groomfamiliesName = form.groomfamiliesName.value;
    const bridefamiliesName = form.bridefamiliesName.value;
    const dateOfWedding = form.dateOfWedding.value;
    const courtesyFamily = form.courtesyFamily.value;
    const senderName = form.senderName.value;
    const subject = form.subject.value;
    let emailList = form.emailList.value;
    const error = document.querySelector('.error')
    const serverError = document.querySelector('.server-response');
    serverError.innerHTML = "";

    error.innerHTML = "";
    //split email list comma seprated
    const emailArray = emailList.split(',');
    //check valid mails
    let valid = mailsChecks(emailArray);

    if (valid.errorMails.length > 0) {
        return error.innerHTML = `correct the mail(s) and try again : ${valid.errorMails.join(", ")}`
    } else {
        emailList = valid.validMails.join(', ');
        //make a fetch request to /dashboard/send-invite endpoint
        const result = await fetch('dashboard/send-invite', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                bridesName,
                groomsName,
                groomfamiliesName,
                bridefamiliesName,
                dateOfWedding,
                courtesyFamily,
                senderName,
                subject,
                emailList
            })
        });
        const data = await result;
        if (data.status == 200) {
            const dataBody = await result.json();
            location.assign(`${dataBody.url}`)
        } else if (data.status == 401) {
            // const dataBody = await result.json();
            serverError.innerHTML = `<p>Unauthorized! You must be logged in to send an invite. login and try again</p>`
        } else if (data.status == 503) {
            // const dataBody = await result.json();
            serverError.innerHTML = `<p>Service is temporary down, we regret every inconvinience this may cause you</p>`
        } else if (data.status == 500) {
            const dataBody = await result.json();
            serverError.innerHTML = `<p>${dataBody.message}</p>`
        }
    }


})


// console.log(email.match(format))