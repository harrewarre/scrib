const noteElem = document.getElementById("notes");
const saveNotificationElem = document.getElementById("saveNotification");
noteElem.innerHTML = localStorage.getItem("notes");

const menuToggle = document.getElementById("menuToggle");
const notelist = document.getElementById("noteList");

// Save the notes 750ms after you stop typing.
const saveTimeout = 750;
let typingTimer;

noteElem.addEventListener("keydown", (ev) => {
    clearTimeout(typingTimer);
    saveNotificationElem.classList.add("app__save-notification--hidden");
});

noteElem.addEventListener("keyup", ev => {
    clearTimeout(typingTimer);
    saveNotificationElem.classList.add("app__save-notification--hidden");
    typingTimer = setTimeout(() => {
        localStorage.setItem("notes", noteElem.innerHTML);
        console.log("Saved!");
        saveNotificationElem.classList.remove("app__save-notification--hidden");
    }, saveTimeout);
});

noteElem.focus();

menuToggle.addEventListener("click", (ev) => {
    notelist.classList.toggle("notelist--hidden");
});

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register("worker.js");
// }