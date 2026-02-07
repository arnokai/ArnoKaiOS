const win = document.getElementById("win");
const minBtn = document.getElementById("min");
const maxBtn = document.getElementById("max");
const closeBtn = document.getElementById("close");
const icon = document.getElementById("icon");
const apps = document.getElementById("apps");

let maximized = false;
let taskBtn = null;


const TaskbarBtn = () => {
    if (taskBtn) return;
    taskBtn = document.createElement("div");
    taskBtn.className = "task-app active";
    taskBtn.innerText = "App";
    apps.appendChild(taskBtn);

    taskBtn.onclick = () => {
        win.style.display = "block";
        taskBtn.classList.add("active");
    };
};

minBtn.onclick = () => {
    win.style.display = "none";
    if (taskBtn) taskBtn.classList.remove("active");
};

maxBtn.onclick = () => {
    maximized = !maximized;
    win.classList.toggle("maximized", maximized);
};

icon.onclick = () => {
    TaskbarBtn();
    win.style.display = "block";
    taskBtn.classList.add("active");
};

closeBtn.onclick = () => {
    win.style.display = "none";
    if (taskBtn) {
        taskBtn.remove();
        taskBtn = null;
    }
};

