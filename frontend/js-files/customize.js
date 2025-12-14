import { reusableTaskForm } from "./form-task.js";

async function fetchAndCreateDropdown(
  containersOfAllNavbars,
  baseUrl,
  btnText,
  btnClassName,
  selectClassName,
  optionText,
  popupMessage
) {
  try {
    const res = await fetch(`${baseUrl}/tasks/get-all`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      if (data.status === 401) {
        popupMessage.classList.add("show");
        popupMessage.textContent = data.message;
        setTimeout(() => {
          popupMessage.textContent = "";
          popupMessage.classList.remove("show");
          window.location.href = "../index.html";
        }, 5000);
      }
      popupMessage.classList.add("show");
      popupMessage.textContent = data.message;

      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
      return;
    }

    if (data.data.length === 0) {
      popupMessage.classList.add("show");
      popupMessage.textContent =
        "You don't have any tasks yet. Please add a new task first.";
      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
      return;
    }

    let options = "";
    data.data.forEach(
      ({ title, id, time_quantity, time_unit, priority, status, content }) => {
        options += `
        <option value="${id}" ${
          selectClassName === "select-el-to-edit"
            ? `data-tiunit = ${time_unit} data-tiquantity = "${time_quantity}" data-priority = "${priority}" data-status = "${status}" data-title=${title} data-content=${content}`
            : ""
        }>
          ${title}
        </option>`;
      }
    );

    containersOfAllNavbars.innerHTML = `
      <div class="customize-delete-and-edit-form-cont">
        <select class="select ${selectClassName}">
          <option>${optionText}</option>
          ${options}
        </select>
        <button class="btn ${btnClassName} common-dropdown-btn disabled">${btnText}</button>
      </div>
    `;
  } catch (err) {
    popupMessage.classList.add("show");
    popupMessage.textContent = err.message;
    setTimeout(() => {
      popupMessage.textContent = "";
      popupMessage.classList.remove("show");
    }, 5000);
  }
}

// Buttons object for delete/edit dropdown
export const cutomizeBtnsClicked = {
  proceedToDelete: async (containersOfAllNavbars, baseUrl, popupMessage) => {
    await fetchAndCreateDropdown(
      containersOfAllNavbars,
      baseUrl,
      "Delete",
      "delete-task",
      "select-el-to-delete",
      "Select a task to delete by its name.",
      popupMessage
    );
  },

  proceedToEdit: async (containersOfAllNavbars, baseUrl, popupMessage) => {
    await fetchAndCreateDropdown(
      containersOfAllNavbars,
      baseUrl,
      "Edit",
      "still-proceed-edit-task",
      "select-el-to-edit",
      "Select a task to edit by its name.",
      popupMessage
    );
  },

  delete: async (baseUrl, taskId, popupMessage) => {
    try {
      const res = await fetch(`${baseUrl}/tasks/delete/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        if (data.status === 401) {
          popupMessage.classList.add("show");
          popupMessage.textContent = data.message;
          setTimeout(() => {
            popupMessage.textContent = "";
            popupMessage.classList.remove("show");
            window.location.href = "../index.html";
          }, 5000);
          return;
        }

        popupMessage.classList.add("show");
        popupMessage.textContent = data.message;
        setTimeout(() => {
          popupMessage.textContent = "";
          window.location.reload();
          popupMessage.classList.remove("show");
        }, 5000);
        return;
      }

      popupMessage.classList.add("show");
      popupMessage.textContent = data.message;
      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
    } catch (err) {
      popupMessage.classList.add("show");
      popupMessage.textContent = err.message;
      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
    }
  },

  stillProceedToEdit: (containersOfAllNavbars, storeUpdate) => {
    reusableTaskForm(
      containersOfAllNavbars,
      "real-update-task",
      "Edit your task",
      storeUpdate
    );
  },
};
