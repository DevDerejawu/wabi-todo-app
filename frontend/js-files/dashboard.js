import { renderSidebarNavlinks, baseUrl } from "./dashboardNavSections.js";
import { navFunctions } from "./navFuns.js";
import { sidebarEndpoints } from "./endpoints.js";
import { cutomizeBtnsClicked } from "./customize.js";
import { decrement, increment, collectFormValuesAndPost } from "./form-task.js";
import { signUpForm } from "./auth.js";

const containersOfAllNavbars = document.querySelector(
  ".containers-of-all-nav-bars"
);
let storeUpdatedTaskId = null;

const popupMessage = document.querySelector(".popup-message");

const targetedH2 = document.querySelector(".fetched-task-message");
const defaultH2 = document.querySelector(".latest-task-message");

const targetedTableThead = document.querySelector(".targeted-table thead");
const targetedTableTbody = document.querySelector(".targeted-table tbody");
const defaultTableThead = document.querySelector(".default-table thead");
const defaultTableTbody = document.querySelector(".default-table tbody");

const targetedTableCont = document.querySelector(".targeted-table-cont");
const sideBarLinks = document.querySelectorAll(".sidebar-links");
const dashboardToggleBtn = document.querySelector(".dashboard-menu-btn");
const closeNavelinksBtn = document.querySelector(".close-navlinks");
const mobileSidebar = document.querySelector(".mobile-sidebar");
const adminBtn = document.querySelector(".admin-btn");
adminBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`${baseUrl}/admin/dashboard`, {
      credentials: "include"
    });
    const data = await res.json();
    if (!data.success) {
      if (data.status === 401) {
        popupMessage.classList.add("show");
        popupMessage.textContent = data.message;
        setTimeout(() => {
          popupMessage.classList.remove("show");
          popupMessage.textContent = "";
          window.location.href = "../index.html";
        }, 5000);
        return;
      }
      if (data.status === 403) {
        popupMessage.classList.add("show");
        popupMessage.textContent = data.message;
        setTimeout(() => {
          popupMessage.classList.remove("show");
          popupMessage.textContent = "";
        }, 5000);
        return;
      }

      popupMessage.classList.add("show");
      popupMessage.textContent = data.message || "Something went wrong.";
      setTimeout(() => {
        popupMessage.classList.remove("show");
        popupMessage.textContent = "";
      });
      return;
    }

    popupMessage.classList.add("show");
    popupMessage.textContent = data.message;
    setTimeout(() => {
      popupMessage.classList.remove("show");
      popupMessage.textContent = "";
      window.location.href = "../pages/admin.html";
    }, 5000);
  } catch (err) {
    popupMessage.classList.add("show");
    popupMessage.textContent = err.message;
    setTimeout(() => {
      popupMessage.classList.remove("show");
      popupMessage.textContent = "";
    }, 5000);
  }
});

let isSidebarShowen = false;
dashboardToggleBtn.addEventListener("click", () => {
  if (!isSidebarShowen) {
    mobileSidebar.classList.remove("show");
    sideBarLinks.forEach((sidebar) => renderSidebarNavlinks(sidebar));
  } else {
    mobileSidebar.classList.add("show");
  }
});

closeNavelinksBtn.addEventListener("click", () => {
  mobileSidebar.classList.add("show");
});

sideBarLinks.forEach((sidebar) => renderSidebarNavlinks(sidebar));

sideBarLinks.forEach((sidebar) => {
  sidebar.addEventListener("click", async (e) => {
    const lis = document.querySelectorAll(".sidebar-links li");

    try {
      const clickedElement = e.target;
      const text = clickedElement.textContent.trim();
      const endpoint = sidebarEndpoints[text];
      if (!endpoint) return;

      lis.forEach((li) => li.classList.remove("active"));
      clickedElement.classList.add("active");

      const hiddenViews = [
        "Dashboard",
        "Add new task",
        "Customize tasks",
        "Logout",
      ];

      if (hiddenViews.includes(text)) {
        targetedTableCont.classList.remove("show");
      } else {
        targetedTableCont.classList.add("show");
      }

      if (text === "Logout") {
        navFunctions.logout(baseUrl, endpoint, popupMessage);
        return;
      }

      if (text === "Dashboard") {
        targetedTableCont.classList.remove("show");
        navFunctions.statisticsDashboard(endpoint, containersOfAllNavbars);
        return;
      }

      if (text === "Add new task") {
        navFunctions.proceedToAddNewTask(containersOfAllNavbars);
        return;
      }

      if (text === "Customize tasks") {
        navFunctions.customizeTasks(containersOfAllNavbars);
        return;
      }

      const res = await fetch(`${baseUrl}${endpoint}`, {
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
        popupMessage.classList.remove("show");
      }, 5000);

      navFunctions.createTables(
        data.data,
        targetedTableThead,
        targetedTableTbody,
        containersOfAllNavbars,
        targetedH2,
        text
      );
    } catch (err) {
      containersOfAllNavbars.innerHTML = `<h2 class="err-message">${err.message}</h2>`;
    }
  });
});

containersOfAllNavbars.addEventListener("click", (e) => {
  // Open editing dropdown
  if (e.target.matches(".proceed-to-edit")) {
    cutomizeBtnsClicked.proceedToEdit(
      containersOfAllNavbars,
      baseUrl,
      popupMessage
    );
  }

  // Open deleting dropdown
  if (e.target.matches(".proceed-to-delete")) {
    cutomizeBtnsClicked.proceedToDelete(
      containersOfAllNavbars,
      baseUrl,
      popupMessage
    );
  }

  //making a button disable if the dropdown is not selected
  document.addEventListener("change", (e) => {
    if (
      e.target.matches(".select-el-to-delete") ||
      e.target.matches(".select-el-to-edit")
    ) {
      const btn = document.querySelector(".common-dropdown-btn");
      if (!e.target.value.trim()) {
        btn.classList.add("disabled");
      } else {
        btn.classList.remove("disabled");
      }
    }
  });

  // delete the task actually not proceed
  if (e.target.matches(".customize-delete-and-edit-form-cont .delete-task")) {
    const selectEl = document.querySelector(".select-el-to-delete");
    const taskId = Number(selectEl.value.trim());

    cutomizeBtnsClicked.delete(baseUrl, taskId, popupMessage);
  }

  // Proceed to edit form
  if (
    e.target.matches(
      ".customize-delete-and-edit-form-cont .still-proceed-edit-task"
    )
  ) {
    const selectEl = document.querySelector(".select-el-to-edit");
    const selectedOption = selectEl.options[selectEl.selectedIndex];
    const status = selectedOption.dataset.status;
    const title = selectedOption.dataset.title;
    const description = selectedOption.dataset.content;
    const timeQuantity = selectedOption.dataset.tiquantity;
    const timeUnit = selectedOption.dataset.tiunit;
    const priority = selectedOption.dataset.priority;
    storeUpdatedTaskId = Number(selectEl.value);
    const storeUpdate = {
      status,
      title,
      description,
      timeQuantity,
      timeUnit,
      priority,
    };

    cutomizeBtnsClicked.stillProceedToEdit(containersOfAllNavbars, storeUpdate);
  }

  //  update the task actually not proceed
  if (e.target.matches(".real-update-task")) {
    collectFormValuesAndPost(
      containersOfAllNavbars,
      baseUrl,
      popupMessage,
      `update-task/${storeUpdatedTaskId}`
    );
  }

  // Time decrement
  if (e.target.matches(".decrement")) {
    const timeUnit = document.getElementById("time-unit");
    const timeQuantity = document.getElementById("time-quantity");
    const decrementBtn = document.querySelector(".decrement");
    decrement(timeUnit, timeQuantity, decrementBtn);
  }

  // Time increment
  if (e.target.matches(".increment")) {
    const timeUnit = document.getElementById("time-unit");
    const timeQuantity = document.getElementById("time-quantity");
    const decrementBtn = document.querySelector(".decrement");
    increment(timeUnit, timeQuantity, decrementBtn);
  }

  // Create new task
  if (e.target.matches(".add-new-task")) {
    collectFormValuesAndPost(containersOfAllNavbars, baseUrl, popupMessage);
  }
});

//execute at the time of a page loads
document.addEventListener("DOMContentLoaded", async () => {
  const userName = document.getElementById("user-name-for-greeting");

  try {
    const res = await fetch(`${baseUrl}/dashboard/profile`, {
      method: "GET",
      credentials: "include",
    });

    const user = await res.json();

    if (!user.success) {
      if (user.status === 401) {
        popupMessage.classList.add("show");
        popupMessage.textContent = user.message;

        showGuestGreeting();
        displayUserProfile(null);

        setTimeout(() => {
          popupMessage.textContent = "";
          popupMessage.classList.remove("show");
          window.location.href = "../index.html";
        }, 5000);

        return;
      }

      userName.textContent =
        "Welcome, we can't load your profile data, please refresh.";
      popupMessage.classList.add("show");
      popupMessage.textContent = user.message;

      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);

      return;
    }

    greetUser(user.data);
    displayUserProfile(user.data);
  } catch (err) {
    userName.textContent =
      "Welcome, we can't load your profile data, please refresh.";
    popupMessage.classList.add("show");
    popupMessage.textContent = err.message;

    setTimeout(() => {
      popupMessage.classList.remove("show");
      popupMessage.textContent = "";
    }, 5000);
  }

function displayUserProfile(user) {
    const container = document.querySelector(".profile-container-for-two-options");
    
    if (user?.profile_picture) {
        container.innerHTML = `<img id="profile-picture" src="${baseUrl}/${user.profile_picture}" alt="Profile">`;
    } else {
        container.innerHTML = `<i class="fas fa-user-circle" id="profile-icon"></i>`;
        const icon = document.getElementById("profile-icon");
        icon.style.fontSize = "40px";
        icon.style.color = "#123";
    }
}

  function timeGreeting() {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 18) return "Good afternoon";
    return "Good evening";
  }

  function greetUser(user) {
    if (user.is_first_login) {
      userName.textContent = `${timeGreeting()}, welcome ${user.name}! 🎉`;
    } else {
      userName.textContent = `${timeGreeting()}, welcome back ${user.name}!`;
    }
  }

  function showGuestGreeting() {
    userName.textContent = `${timeGreeting()}, nice to meet you Guest!`;
  }

  //toggling profile modal functionality starts here
  const modal = document.querySelector(".profile-modal");
  const openProfileModalBtn = document.getElementById("profile-picture");
  const closeProfileModalBtn = document.querySelector(".close-profile-modal");

  openProfileModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  closeProfileModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("profile-modal-backdrop")) {
      modal.style.display = "none";
    }
  });
  //toggling profile modal functionality ends here

  //sending updated data to backend is starts here

  document.addEventListener("click", async (e) => {
    if (e.target.matches(".profile-modal .btn")) {
      const profileName = document.querySelector(
        ".profile-modal input[type='text']"
      );
      const profilePassword = document.querySelector(
        '.profile-modal input[type="password"]'
      );
      const profilePicture = document.querySelector(
        '.profile-modal input[type="file"]'
      );

      function validateProfileData(signUpForm, type, value) {
        const inputObj = signUpForm.find((obj) => obj.type.trim() === type);
        console.log(signUpForm);
        if (!inputObj) {
          popupMessage.classList.add("show");
          popupMessage.textContent = "Can't find form object.";

          setTimeout(() => {
            popupMessage.classList.remove("show");
            popupMessage.textContent = "";
          }, 5000);
          return false;
        }
        const regexp = new RegExp(inputObj.pattern);
        if (!regexp.test(value)) {
          popupMessage.classList.add("show");
          popupMessage.textContent = inputObj.message;

          setTimeout(() => {
            popupMessage.classList.remove("show");
            popupMessage.textContent = "";
          }, 5000);

          return false;
        }

        return true;
      }

      if (profileName.value.trim()) {
        const validated = validateProfileData(
          signUpForm,
          "text",
          profileName.value.trim()
        );

        if (!validated) return;
      }

      if (profilePassword.value.trim()) {
        const validated = validateProfileData(
          signUpForm,
          "password",
          profilePassword.value.trim()
        );

        if (!validated) return;
      }

      if (profilePicture.files.length > 0) {
        const requiredFileTypes = ["image/jpeg", "image/png"];
        const file = profilePicture.files[0];

        if (
          profilePicture.files.length > 1 ||
          !requiredFileTypes.includes(file.type)
        ) {
          popupMessage.classList.add("show");
          popupMessage.textContent = "We only need one image file (jpeg, png)";

          setTimeout(() => {
            popupMessage.classList.remove("show");
            popupMessage.textContent = "";
          }, 5000);

          profilePicture.value = "";
          return;
        }
      }

      if (
        !profileName.value.trim() &&
        !profilePassword.value.trim() &&
        !profilePicture.files.length > 0
      ) {
        popupMessage.classList.add("show");
        popupMessage.textContent = "At least give one valid info!";

        setTimeout(() => {
          popupMessage.classList.remove("show");
          popupMessage.textContent = "";
        }, 5000);

        return;
      }

      const formData = new FormData();
      formData.append("name", profileName.value.trim());
      formData.append("password", profilePassword.value.trim());
      formData.append("profile-picture", profilePicture.files[0]);

      try {
        const res = await fetch(`${baseUrl}/profile/me`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
          
        });

        const data = await res.json();

        if (!data.success) {
          if (data.status === 401) {
            popupMessage.classList.add("show");
            popupMessage.textContent = data.message;

            showGuestGreeting();
            displayUserProfile(null);

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

        greetUser(data.data);
        displayUserProfile(data.data);
      } catch (err) {
        userName.textContent =
          "Welcome, we can't load your profile data, please refresh.";
        popupMessage.classList.add("show");
        popupMessage.textContent = err.message;

        setTimeout(() => {
          popupMessage.classList.remove("show");
          popupMessage.textContent = "";
        }, 5000);
      }
    }
  });

  //sending updated data to backend is ends here

  await navFunctions.statisticsDashboard(
    sidebarEndpoints["Dashboard"],
    containersOfAllNavbars
  );

  try {
    //here I don't have to check the status is 401, because the above function will do it, that means if status is 401 or unthenticated the user will be redirected to home page.
    const res = await fetch(`${baseUrl}/tasks/latest`, {
      method: "Get",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      popupMessage.classList.add("show");
      popupMessage.textContent = data.message;

      setTimeout(() => {
        popupMessage.textContent = "";
        popupMessage.classList.remove("show");
      }, 5000);
      return;
    }

    navFunctions.createTables(
      data.data,
      defaultTableThead,
      defaultTableTbody,
      popupMessage,
      defaultH2
    );
  } catch (err) {
    popupMessage.classList.add("show");
    popupMessage.textContent = err.message;
    setTimeout(() => {
      popupMessage.textContent = "";
      popupMessage.classList.remove("show");
    }, 5000);
  }
});
