async function postDetails(event) {
    event.preventDefault()
    const user  = document.getElementById("user").value
    const div = document.getElementById("response")

    try {
        const response = await fetch("/hw11-signin/fetch",{
         headers:{"Content-Type":"application/json"},
         method:"POST",
         body:JSON.stringify({user}),
        });
        const text = await response.text()
        div.textContent = text

        if(text.startsWith(`Welcome ${user}`)){
            setTimeout(()=> {
                window.location.href = "/hw11-index.html"
            }, 2000)
        }
    } catch (error) {
        console.log("error", error);
    }
}

async function postSingup(event) {
    event.preventDefault()
    const username  = document.getElementById("username").value
    const email  = document.getElementById("email").value
    const password  = document.getElementById("password").value
    const confirmPassword  = document.getElementById("confirmPassword").value
    const div = document.getElementById("SignupResponse")

    try {
        const response = await fetch("/hw11-index/fetch",{
         headers:{"Content-Type":"application/json"},
         method:"POST",
         body:JSON.stringify({username, email, password, confirmPassword}),
        });
        const text = await response.text()
        div.textContent = text

        if (text !== "Signup successful") {
            return;
        }

        localStorage.setItem("username", username)
        // window.location.href = "hw11-home.html"

        setTimeout(() => {
        window.location.href = "/home"
        }, 2000)

    } catch (error) {
        console.log("error", error);
    }
}