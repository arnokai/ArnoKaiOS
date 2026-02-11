const appsInfo = [
  {
    title: "Blockaway",
    icon: "",
    link: "",
    description: "",
  },
];

const template = document.getElementById("win");
const icon = document.getElementById("icon");
const apps = document.getElementById("apps");

const desktop = document.getElementById("desktop");

icon.onclick = () => {
  createWindow("App", "https://blockaway.net/");
};

function createWindow(title, url) {
  const clone = template.content.cloneNode(true);
  const appWindow = clone.querySelector(".window");
  const titlebar = clone.querySelector(".titlebar");
  const minBtn = clone.querySelector(".min");
  const maxBtn = clone.querySelector(".max");
  const closeBtn = clone.querySelector(".close");
  const iframe = clone.querySelector(".content");
  const titleEl = clone.querySelector(".app-title");

  titleEl.textContent = title;
  iframe.src = url;

  let maximized = false;

  appWindow.style.top = window.innerHeight / 2 - 200 + "px";
  appWindow.style.left = window.innerWidth / 2 - 300 + "px";

  const taskBtn = document.createElement("div");
  taskBtn.className = "task-app active";
  taskBtn.innerText = title;
  apps.appendChild(taskBtn);

  taskBtn.onclick = () => {
    if (appWindow.style.display === "none") {
      appWindow.style.display = "block";
      taskBtn.classList.add("active");
    } else {
      appWindow.style.display = "none";
      taskBtn.classList.remove("active");
    }
  };

  minBtn.onclick = () => {
    appWindow.style.display = "none";
    taskBtn.classList.remove("active");
  };

  maxBtn.onclick = () => {
    maximized = !maximized;
    appWindow.classList.toggle("maximized", maximized);
  };

  closeBtn.onclick = () => {
    appWindow.remove();
    taskBtn.remove();
  };

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titlebar.ondblclick = () => {
    maximized = !maximized;
    appWindow.classList.toggle("maximized", maximized);
  };
  titlebar.onmousedown = (e) => {
    if (maximized) return;
    isDragging = true;
    offsetX = e.clientX - appWindow.offsetLeft;
    offsetY = e.clientY - appWindow.offsetTop;

    document.body.style.cursor = "move";
  };

  document.onmousemove = (e) => {
    if (!isDragging) return;

    appWindow.style.left = e.clientX - offsetX + "px";
    appWindow.style.top = e.clientY - offsetY + "px";
  };

  document.onmouseup = () => {
    isDragging = false;
    document.body.style.cursor = "default";
  };

  desktop.appendChild(clone);
}
