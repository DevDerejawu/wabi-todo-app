export function increment(timeUnit, timeQuantity, decrementBtn) {
  let unit = timeUnit.textContent;
  let quantity = Number(timeQuantity.textContent);

  if (unit === "minute(s)") {
    if (quantity < 10) {
      quantity++;
      decrementBtn.classList.remove("disabled-btn");
    } else if (quantity < 50) {
      quantity += 10;
    } else {
      quantity = 1;
      unit = "hour(s)";
    }
  } else if (unit === "hour(s)") {
    quantity++;
  }

  timeQuantity.textContent = quantity;
  timeUnit.textContent = unit;
}

export function decrement(timeUnit, timeQuantity, decrementBtn) {
  let unit = timeUnit.textContent;
  let quantity = Number(timeQuantity.textContent);

  if (unit === "hour(s)") {
    if (quantity > 1) {
      quantity--;
    } else {
      quantity = 50;
      unit = "minute(s)";
    }
  } else if (unit === "minute(s)") {
    if (quantity > 10) {
      quantity -= 10;
    } else if (quantity > 1) {
      quantity -= 1;
    } else {
      decrementBtn.classList.add("disabled-btn");
    }
  }

  timeQuantity.textContent = quantity;
  timeUnit.textContent = unit;
}

export async function collectFormValuesAndPost(
  containersOfAllNavbars,
  baseUrl,
  popupMessage,
  endpoint = "add-new-task"
) {
  try {
    const nameEl = containersOfAllNavbars.querySelector("#task-name-input-el");
    const descEl = containersOfAllNavbars.querySelector(
      "#task-description-textarea-el"
    );
    const priorityEl = containersOfAllNavbars.querySelector(
      "input[name='priority']:checked"
    );
    const quantityEl = containersOfAllNavbars.querySelector("#time-quantity");
    const unitEl = containersOfAllNavbars.querySelector("#time-unit");
    const statusEl = containersOfAllNavbars.querySelector(
      "input[name='status']:checked"
    );

    if (nameEl.value.trim().length <= 3) {
      popupMessage.classList.add("show");
      popupMessage.textContent = "Title or name is too short";
      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
      return;
    }

    if (descEl.value.trim().length <= 10) {
      popupMessage.classList.add("show");
      popupMessage.textContent = "The description is too short";
      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
      return;
    }

    let shouldProceed = true;

    if (
      Number(quantityEl.textContent.trim()) === 1 &&
      unitEl.textContent === "hour(s)"
    ) {
      shouldProceed = window.confirm(
        "You didn't change the '1 hour(s)'! Proceed?"
      );
    }

    if (!shouldProceed) return;

    const taskData = statusEl?.value
      ? {
          title: nameEl.value.trim(),
          description: descEl.value.trim(),
          priority: priorityEl.value,
          deadline: parseInt(quantityEl.textContent) + unitEl.textContent,
          timeQuantity: Number(quantityEl.textContent),
          timeUnit: unitEl.textContent,
          status: statusEl.value.trim(),
        }
      : {
          title: nameEl.value.trim(),
          description: descEl.value.trim(),
          priority: priorityEl.value,
          deadline: parseInt(quantityEl.textContent) + " " + unitEl.textContent,
          timeQuantity: Number(quantityEl.textContent),
          timeUnit: unitEl.textContent,
        };

    const res = await fetch(`${baseUrl}/tasks/${endpoint}`, {
      method: statusEl?.value ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(taskData),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      if (data.status === 401) {
        popupMessage.classList.add("show");
        popupMessage.textContent = message;
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
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
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
  } catch (err) {
    popupMessage.classList.add("show");
    popupMessage.textContent = err.message;
    setTimeout(() => {
      popupMessage.textContent = "";
      popupMessage.classList.remove("show");
    }, 5000);
  }
}

export function reusableTaskForm(
  containersOfAllNavbars,
  addTaskBtnClass,
  btnText,
  update = ""
) {
  containersOfAllNavbars.innerHTML = `
    <div class="input-btn-cont" id="form-cont">
      <label>
        <p>Task Name:</p>
        <input type="text" id="task-name-input-el" placeholder="Name or Title of the task" value="${
          update?.title ?? ""
        }">
      </label>

      <label>
        <p>Description:</p>
        <textarea id="task-description-textarea-el" placeholder="description of the task">${
          update?.description ?? ""
        }</textarea>
      </label>

      ${
        update
          ? `<div id="status-of-task">
        <h3>Choose the status if it is completed, In progress or on pending</h3>
        <label for="completed">
          <input type="radio" value="completed" name="status" id="completed" ${
            update?.status === "completed" ? "checked" : ""
          }> completed
        </label>
        <label for="in-progress">
          <input type="radio" value="in-progress" name="status" id="in-progress" ${
            update?.status === "in-progress" ? "checked" : ""
          }> In progress
        </label>
        <label for="pending">
          <input type="radio" value="pending" name="status" id="pending" ${
            update?.status === "pending" ? "checked" : ""
          }> On pending
        </label>
      </div>`
          : ""
      }

      <div id="priority-cont">
        <h3>Priority or the urgency of the task:</h3>
        <div id="option-cont">
          <label><input type="radio" name="priority" value="low" ${
            update?.priority === "low" ? "checked" : ""
          }> Low</label>
          <label><input type="radio" name="priority" value="medium" ${
            update?.priority === "medium" ? "checked" : ""
          } ${!update?.priority ? "checked" : ""}> Medium</label>
          <label><input type="radio" name="priority" value="high" ${
            update?.priority === "high" ? "checked" : ""
          }> High</label>
        </div>
      </div>

      <div id="duration-cont">
        <p>It must be done within:</p>
        <div class="inc-and-dec-cont">
          <button class="decrement">▼</button>
          <span id="time-quantity">${update?.timeQuantity ?? 1}</span> 
          <span id="time-unit">${update?.timeUnit ?? "hour(s)"}</span>
          <button class="increment">▲</button>
        </div>
      </div>

      <button class="task-btn ${addTaskBtnClass}">${btnText}</button>
    </div>
  `;
}
