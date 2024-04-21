let displayData = () => {
    let tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    let storedUser = JSON.parse(localStorage.getItem("users"))
    if(storedUser && storedUser.length > 0) {
        let user = storedUser[0]; // Get the first (newest) entry
        tbody.innerHTML += `
            <tr>
                <td>1</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.address.city}</td>
                <td>${user.website}</td>
            </tr>`;
    }
}

let btn = document.getElementById("btn")
btn.addEventListener("click", () => {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const name = document.getElementById("name").value
    const city = document.getElementById("city").value
    const website = document.getElementById("website").value
    const phone = document.getElementById("phone").value

    let postObject = {
        email, password, name, website, phone ,username,  address:{
            city:city
        }
    }

    let xhr = new XMLHttpRequest()
    xhr.open("POST", "https://jsonplaceholder.typicode.com/users/")
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(postObject))

    xhr.onload = () => {
        if (xhr.status == 201) {
            let storedUser = [postObject]; // Store only the new entry in an array
            localStorage.setItem("users", JSON.stringify(storedUser))
            displayData()
        }
    }
})
