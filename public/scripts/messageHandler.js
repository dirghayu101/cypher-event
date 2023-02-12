const messageBar = document.querySelectorAll(".messageBar>input");
const chat = document.querySelectorAll("#chat")
const messageContainer = document.querySelectorAll(".messageContainer")

const characterName="charlie"
chat[0].addEventListener('click', () => {
    if (messageBar[0].value != "") {
        clientmessage = `<div class="container-fluid clientMessage messsages ${characterName} ">
<h6>Agent ${characterName}</h6>
<p>${messageBar[0].value}</p>
</div>`
        messageContainer[0].insertAdjacentHTML('beforeend', clientmessage)

        messageBar[0].value=""
        messageContainer[0].scrollTop=messageContainer[0].scrollHeight

    }



})