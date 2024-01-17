const btn = document.getElementById(`submitBtn`)
const email = document.getElementById(`email`)
const password = document.getElementById(`password`)
const err = document.getElementById(`errMsg`)

btn.addEventListener("click", () => {
    if (btn.value.toLowerCase() === "register") {
        if (!document.getElementById(`first_name`).value.match(/([a-zA-Z]+)/g)) {
            err.innerHTML = "Wrong first name input type!"
            return
        } else if (!document.getElementById(`last_name`).value.match(/([a-zA-Z]+)/g)) {
            err.innerHTML = "Wrong last name input type!"
            return
        }
    }
    if (!email.value.match(/.+@(gmail.com|mail.ru|yandex.ru)/g)) {
        err.innerHTML = "Wrong email format!"
        return
    }
    if (!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g)) {
        err.innerHTML = "Password is not valid!"
        return
    }

    document.getElementById(`register-form`).submit()
})