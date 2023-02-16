const handleLogin = async (event) => {
    event.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    if(!username || !password){
        alert("Enter values before submission!")
    }else{
        const result = await fetch('/user/login',{
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.json())
        console.log(result)
        if(result.success){
            localStorage.setItem('user', JSON.stringify(result.user))
            window.location.href='http://localhost:5500/user/intro'
        } else{
            alert(result.message)
        }
    }

}

document.querySelector('#submit').addEventListener('click', handleLogin)
document.querySelector('#password').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.querySelector('#submit').click();
    }
});

// const user = JSON.parse(localStorage.getItem('user'));