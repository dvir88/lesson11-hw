async function postDetails(event) {
    event.preventDefault()
    const user  = document.getElementById("user").value
    const age = document.getElementById("age").value
    const div = document.getElementById("response")

    //option 1
    // fetch("/signin/fetch", {
    //     headers:{"Content-Type":"application/json"},
    //     method:"POST",
    //     body:JSON.stringify({user,age})
    // }).then(res => res.text().then(data => {
    //     console.log(first)
    //     div.textContent = data
    // }))
    try {
        const response = await fetch("/signin/fetch", {
         headers:{"Content-Type":"application/json"},
         method:"POST",
         body:JSON.stringify({user,age}),
        });
        const text = await response.text()
        div.textContent = text
    } catch (error) {
        console.log("error");
    }
}