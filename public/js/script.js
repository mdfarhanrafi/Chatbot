
const textbox = document.getElementById('textbox')
const sendbtn = document.getElementById('sendbtn')
const chatcontainer = document.getElementById('chatcontainer')
const user = { message: "" }


async function chatbot(usertext) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usertext }),
        });
        const data = await response.json();
        return data.response; // This is the bot's response
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get chatbot response');
    }
}

function sendMessage(usertext) {
    const message = document.createElement('div');
    message.style.textAlign = "right";
    message.style.margin = "10px";
    message.innerHTML = "<span>You: </span>" + "<span>" + usertext + "</span>";
    chatcontainer.appendChild(message);
}

const chatbotresponse = async (usertext)=> {
    try {
        // Assuming chat() is available and returns a Promise that resolves to the bot's response
        const Chat = await chatbot(usertext);
        const message = document.createElement('div');
        message.style.textAlign = "left";
        message.style.margin = "10px";
        message.innerHTML = "<span>Bot: </span>" + "<span>" + Chat + "</span>";
        chatcontainer.appendChild(message);
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        // Optionally, display an error message to the user
        const errorMessage = document.createElement('div');
        errorMessage.style.textAlign = "left";
        errorMessage.style.margin = "10px";
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "<span>Bot: </span><span>Sorry, I encountered an error. Please try again.</span>";
        chatcontainer.appendChild(errorMessage);
    }
}

sendbtn.addEventListener('click', async function(e){
    const userMessage = textbox.value;
    if (userMessage == "")
        alert("Please enter some message")
    else {
        const usertext = userMessage.trim()
        user.message = usertext
        textbox.value = ""
        sendMessage(usertext)
        await chatbotresponse(usertext)
    }
})
