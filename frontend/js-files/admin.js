import { baseUrl } from "./dashboardNavSections.js";

const userDashboard = document.getElementById("btn-user-dashboard");
const usersCount = document.getElementById("btn-users-count");
const tasksCount = document.getElementById("btn-tasks-count");
const users = document.getElementById("btn-users");
const tasks = document.getElementById("btn-tasks");
const output = document.getElementById("output");
const deleteUser = document.getElementById("btn-delete-users");

userDashboard.addEventListener("click", () => {
  window.location.href = "../pages/dashboard.html";
});

function renderWhenBtnsCliked(isNumber, h2Text, arrayData) {
  if (isNumber) {
    output.innerHTML = `<div class="card">Total Users: <b>${arrayData.length}</b></div>`;
  } else {
    output.innerHTML = `
        <div class="card">
          <h3>${h2Text}</h3>
          <ul>
            ${
              h2Text === "Users with thier emails"
                ? arrayData
                    .map((u) => `<li>${u.name} - ${u.email}</li>`)
                    .join("")
                : arrayData.map((t) => `<li>${t.title}</li>`).join("")
            }
          </ul>
        </div>
      `;
  }
}
async function fetchTotalUsers() {
  try {
    const res = await fetch(`${baseUrl}/admin/total-users`);
    const data = await res.json();

    if (!data.success) {
      if (data.status === 401) {
        window.location.href = "../index.html";
      }
      if (data.status === 403) {
        window.location.href = "../index.html";
      }
      alert(data.message);
      return;
    }
    renderWhenBtnsCliked(true, "Total numbers of users.", data.data);
  } catch (err) {
    alert("Backend can't send the data.");
  }
}

async function fetchTotalTasks() {
  try {
    const res = await fetch(`${baseUrl}/admin/total-tasks`);
    const data = await res.json();

    if (!data.success) {
      if (data.status === 401) {
        window.location.href = "../index.html";
      }
      if (data.status === 403) {
        window.location.href = "../index.html";
      }
      alert(data.message || "Backend can't send the data.");
      return;
    }
    renderWhenBtnsCliked(true, "Total numbers of tasks.", data.data);
  } catch (err) {
    alert("Backend can't send the data.");
  }
}

async function fetchUsersList() {
  try {
    const res = await fetch(`${baseUrl}/admin/users-list`);
    const data = await res.json();
    if (!data.success) {
      if (data.status === 401) {
        window.location.href = "../index.html";
      }
      if (data.status === 403) {
        window.location.href = "../index.html";
      }
      alert(data.message || "Can't fetching users list");
      return;
    }
    renderWhenBtnsCliked(false, "Users with thier emails", data.data);
  } catch (err) {
    alert("Error fetching users list");
  }
}

async function fetchTasksList() {
  try {
    const res = await fetch(`${baseUrl}/admin/tasks-list`);
    const data = await res.json();
    if (!data.success) {
      if (data.status === 401) {
        window.location.href = "../index.html";
      }
      alert(data.message || "Can't fetching task lists");
      return;
    }
    renderWhenBtnsCliked(false, "Task Lists", data.data);
  } catch (err) {
    alert("Error fetching task lists");
  }
}

async function deleteUserByEmail(email) {
  try {
    const res = await fetch(`${baseUrl}/admin/delete-user/${email}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      if (data.status === 401) {
        window.location.href = "../index.html";
      }
      if (data.status === 403) {
        window.location.href = "../index.html";
      }
      alert(data.message || "Can't delete the user");
      return;
    }
  } catch (err) {
    allert("Error deleting user:");
  }
}

usersCount.addEventListener("click", () => {
  fetchTotalUsers();
});
users.addEventListener("click", () => {
  fetchUsersList();
});
tasks.addEventListener("click", () => {
  fetchTotalTasks();
});

tasksCount.addEventListener("click", () => {
  fetchTasksList();
});

deleteUser.addEventListener("click", () => {
  const userEmail = prompt("Please enter an emal that you wanna delete.");
  deleteUserByEmail(userEmail);
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`${baseUrl}/admin/dashboard`);
    const data = await res.json();
    if (data.status === 401 || data.status === 403) {
      window.location.href = "../index.html";
      return;
    }
    if (!data.success) {
      alert(data.message || "Error from server");
      return;
    }

    if (data.success) {
      alert("Wellcom to your admin dashboard");
    }
  } catch (err) {
    alert("Unknown error");
  }
});
