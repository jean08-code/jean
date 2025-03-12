document.addEventListener("DOMContentLoaded", function() {
    loadUsers();
});

function addUser() {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Please fill in both fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (isEmailExists(email)) {
        alert("This email is already registered.");
        return;
    }

    saveUser(name, email);
    appendUserToTable(name, email);
    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isEmailExists(email) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email);
}

function saveUser(name, email) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email });
    localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var tableBody = document.getElementById("userTable").getElementsByTagName('tbody')[0];

    tableBody.innerHTML = "";

    users.forEach(user => {
        appendUserToTable(user.name, user.email);
    });
}

function appendUserToTable(name, email) {
    var tableBody = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    var newRow = tableBody.insertRow();
    
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    
    cell1.innerHTML = name;
    cell2.innerHTML = email;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        deleteUser(email);
    };

    cell3.appendChild(deleteBtn);
}

function deleteUser(email) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var filteredUsers = users.filter(user => user.email !== email);
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    loadUsers();
}
document.addEventListener("DOMContentLoaded", loadChat);

function sendMessage() {
    var chatInput = document.getElementById("chatInput").value.trim();
    if (!chatInput) {
        alert("Message cannot be empty!");
        return;
    }

    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push(chatInput);
    localStorage.setItem("chatMessages", JSON.stringify(messages));

    appendMessage(chatInput);
    document.getElementById("chatInput").value = "";
}

function loadChat() {
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    var chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    messages.forEach((msg, index) => {
        appendMessage(msg, index);
    });
}

function appendMessage(message, index = null) {
    var chatBox = document.getElementById("chatBox");
    var msgDiv = document.createElement("div");
    msgDiv.className = "message";
    
    var msgText = document.createElement("span");
    msgText.innerText = message;
    
    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "×";
    deleteBtn.className = "delete-msg-btn";
    deleteBtn.onclick = function() {
        deleteMessage(index);
    };
    
    msgDiv.appendChild(msgText);
    msgDiv.appendChild(deleteBtn);
    chatBox.appendChild(msgDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

function deleteMessage(index) {
    var messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.splice(index, 1);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    loadChat();
}