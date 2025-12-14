import {
  getTaskStatistics,
  getDashboardNavSection,
} from "./dashboardNavSections.js";

import { reusableTaskForm } from "./form-task.js";

export const navFunctions = {
  logout: async (baseUrl, endpoint, popupMessage) => {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        if (data.status === 401) {
          popupMessage.classList.add("show");
          popupMessage.textContent =
            "You are already logged out at time of asking loging out.";
          setTimeout(() => {
            popupMessage.classList.remove("show");
            popupMessage.textContent = "";
            window.location.href = "../index.html";
          }, 5000);
          return;
        }

        popupMessage.classList.add("show");
        popupMessage.textContent = data.message;
        setTimeout(() => {
          popupMessage.classList.remove("show");
          popupMessage.textContent = "";
        }, 5000);
        return;
      }

      popupMessage.classList.add("show");
      popupMessage.textContent = data.message;
      setTimeout(() => {
        popupMessage.classList.remove("show");
        popupMessage.textContent = "";
        window.location.href = "../index.html";
      }, 5000);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  statisticsDashboard: async (endpoint, containersOfAllNavbars) => {
    try {
      const resValue = await getTaskStatistics(endpoint);

      if (!resValue.success) {
        if (resValue.status === 401) {
          containersOfAllNavbars.innerHTML = `<h2 class="err-message">${resValue.message}</h2>`;
          setTimeout(() => {
            containersOfAllNavbars.innerHTML = "";
            window.location.href = "../index.html";
          }, 5000);
          return;
        }

        throw new Error(resValue.message);
      }

      const items = getDashboardNavSection(resValue.data);

      let html = "";
      items.map(({ text, quantity }) => {
        html += `
          <div class="card">
            <h3>${text}</h3>
            <p>${quantity}</p>
          </div>
        `;
      });

      containersOfAllNavbars.innerHTML = `<section class="cards">${html}</section>`;
    } catch (err) {
      containersOfAllNavbars.innerHTML = `<h2 class="err-message">${err.message}</h2>`;
    }
  },

  proceedToAddNewTask: async (containersOfAllNavbars) => {
    try {
      reusableTaskForm(
        containersOfAllNavbars,
        "add-new-task",
        "Post your task"
      );
    } catch (err) {
      throw new Error(err.message);
    }
  },

  createTables: (
    data,
    tableThead,
    tableTbody,
    popupMessage,
    h2,
    text = " Your top 5 latest tasks if you have posted more than 5."
  ) => {
    try {
      if (data.length === 0) {
        popupMessage.classList.add("show");
        popupMessage.textContent = `You don't have any ${text} so far.`;
        setTimeout(() => {
          popupMessage.classList.remove("show");
          popupMessage.textContent = "";
        }, 5000);
        return;
      }

      h2.textContent = text;

      tableThead.innerHTML = `
        <tr>
          <th>Title</th>
          <th>status</th>
          <th>Deadline</th>
        </tr>
      `;

      tableTbody.innerHTML = "";

      data.forEach((item) => {
        tableTbody.innerHTML += `
          <tr>
            <td>${item.title}</td>
            <td><span class="badge ${item.status.toLowerCase()}">
             ${item.status} 
            </span></td>
            <td>${item.deadline}</td>
          </tr>
        `;
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //showing two btns (proceed-to-delete and proceed-to-edit);
  customizeTasks: (containersOfAllNavbars) => {
    try {
      containersOfAllNavbars.innerHTML = `
        <div class="customization-btn-cont">
          <h2>You can customize based your interest, just click the buttons bellow.</h2>
          <div class="customize-btn-cont">
            <button class="proceed-to-edit">Edit your task</button>
            <button class="proceed-to-delete">Delete your task</button>
          </div>
        </div>
      `;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
