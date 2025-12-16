import { closeMenu, openOrCloseMenu } from "./toggleFunctionality.js";
import { footer } from "./footer.js";
import {
  signUpForm,
  signInForm,
  renderForm,
  verifyForm,
  validateInputs,
  sendLogingData,
  sendRegisteringData,
  verifyEmail,
} from "./auth.js";

import { baseUrl } from "./dashboardNavSections.js";;

footer(document.body);
const startPopupMesage = document.querySelector(".start-popup-message");

document.addEventListener("DOMContentLoaded", () => {
  const authModals = document.querySelector(".auth-modal"); 
  const dashboardBtn = document.querySelector(".dashboard-btn");
  const authContainer = document.getElementById("auth-container");
  const openLogginSection = document.querySelectorAll(".open-login-btn");
  const signUpBtnInHome = document.querySelector(".open-register-btn");
  const typingTimers = new Map();

  dashboardBtn.addEventListener("click", async ()=>{
    try {
    const res = await fetch(`${baseUrl}/api/auth/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
       startPopupMesage.classList.add("show");
        startPopupMesage.textContent = data.message || "Please login, your session is expired";
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
        return;
    }
    window.location.href = "../pages/dashboard.html";
  } catch (err) {
     startPopupMesage.classList.add("show");
        startPopupMesage.textContent = err.message || "Please login, your session is expired";
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
  }
  })
  
  authModals.addEventListener("click", (e) => {

    // Eye togging functionality is here
    if (e.target.matches(".toggle-password")) {
      const parent = e.target.closest(".password-group");
      const passwordInput = parent.querySelector("input");
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      e.target.textContent = passwordInput.type === "password" ? "👁️" : "⬛";
    }
  });

  // Menu toggle in small screen. 
  const menuBtn = document.querySelector(".menu-btn");
  const closeMenuBtnInSmallScreen = document.querySelector(".close-menu-btn");
  const ulLinks = document.querySelector(".mobile-ul-links");
  menuBtn.addEventListener("click", () => openOrCloseMenu(ulLinks, menuBtn));
  closeMenuBtnInSmallScreen.addEventListener("click", () => closeMenu(ulLinks, menuBtn));

  // Open sign up form.
  signUpBtnInHome.addEventListener("click", () => {
    authContainer.classList.add("active");
    authModals.innerHTML = renderForm(signUpForm, "Sign Up", "register-btn");
  });

  //open sign in form.
  openLogginSection.forEach((btn) => {
    btn.addEventListener("click", () => {
      authContainer.classList.add("active");
      authModals.innerHTML = renderForm(signInForm, "Sign In", "login-btn");
    });
  });

  authModals.addEventListener("click", async (e) => {

    // Close form modal.
     if (e.target.matches("#close-modal-btn") || e.target.matches(".auth-overlay")) {
      authContainer.classList.remove("active");
    }

    //get userId 
    let userId = null;

    //when the sign in form is opened, the user can go to sign in form.
    if (e.target.matches(".sign-up")) {
      authModals.innerHTML = renderForm(signUpForm, "Sign Up", "register-btn");
    }

    //when the sign up form is opened, the user can go to sign in form.
    if (e.target.matches(".sign-in")) {
      authModals.innerHTML = renderForm(signInForm, "Sign In", "login-btn");
    }

    //submit registering btn and sending data to backend to be registered. and redirecting to verify popup or page.
    if (e.target.matches(".register-btn")) {
        const btn = e.target;
        const text = btn.textContent;
      try {
        btn.style.cursor = "not-allowed";
        btn.textContent = "Wait a moment..."
        const result = [];

        //validate the inpus again if they are submitted in any case just to make sure.
        signUpForm.forEach(({id, pattern}) =>{
          const el = authModals.querySelector(`#${id}`);
          const regexp = new RegExp(pattern);
          if(regexp.test(el.value)){
            result.push(1);
          }else{
             result.push(0);
          }
        } );
        const password = authModals.querySelector("#sign-up-password");
        const email = authModals.querySelector("#sign-up-email");
        const name = authModals.querySelector("#sign-up-name");

        if (result.includes(0)) {
          startPopupMesage.classList.add("show");
          startPopupMesage.textContent = "please give valid inputs.";
          setTimeout(() => {
            startPopupMesage.classList.remove("show");
            startPopupMesage.textContent = "";
          }, 5000);
          return;
        }

        const data = await sendRegisteringData(password.value, email.value, name.value);

        if (!data.success) {
          startPopupMesage.classList.add("show");
          startPopupMesage.textContent = data.message || "backend can't send the correct data.";
          setTimeout(() => {
            startPopupMesage.classList.remove("show");
            startPopupMesage.textContent = "";
          }, 5000);
          return;
        }

        //updating the user id to use it for verification that is sent from backend at time of registering. but we don't use it any more.
        userId = data.data.userId;

        // redirect the user to verification page is not better now since we can't verfication email, so I have commented it.
        // authModals.innerHTML = renderForm(verifyForm, "Verify", "verify-btn"); 
        startPopupMesage.classList.add("show");
        startPopupMesage.textContent = data.message;
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);

      } catch (err) {
        startPopupMesage.classList.add("show");
        startPopupMesage.textContent = err.message || "Backend server error";
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
      }finally{
        btn.textContent = text;
        btn.style.cursor = "pointer";
      }
    }

    // Login btn is clicked and sent the data to back end to be logged in.
    if (e.target.matches(".login-btn")) {
      const btn = e.target;
      const text = btn.textContent;
      try {
        btn.style.cursor = "not-allowed";
        btn.textContent = "Wait a moment..." 
        const password = authModals.querySelector("#sign-in-password");
        const email = authModals.querySelector("#sign-in-email");

        if (!password.value || !email.value) {
          startPopupMesage.classList.add("show");
          startPopupMesage.textContent = "Each field must not be empty.";
          setTimeout(() => {
            startPopupMesage.classList.remove("show");
            startPopupMesage.textContent = "";
          }, 5000);
          return;
        }

        const data = await sendLogingData(password.value, email.value);

        if (!data.success) {
          startPopupMesage.classList.add("show");
          startPopupMesage.textContent = data.message || "backend error occured";
          setTimeout(() => {
            startPopupMesage.classList.remove("show");
            startPopupMesage.textContent = "";
          }, 5000);
          return;
        }

        startPopupMesage.classList.add("show");
        startPopupMesage.textContent = data.message;
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
        window.location.href = "../pages/dashboard.html"; 
          startPopupMesage.textContent = "";
        }, 5000);



      } catch (err) {
        startPopupMesage.classList.add("show");
        startPopupMesage.textContent = err.message || "Unknown error occured";
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
      }finally{
        btn.textContent = text;
        btn.style.cursor = "pointer";
      }
    }

    // Verify btn is cliked sending the sent otp and userId to make sure it is real email.
    //verify btn is not clicked any more but just let me keep it.
    if (e.target.matches(".verify-btn")) {
      try {
        const otp = authModals.querySelector("#verify-otp").value;
        const data = await verifyEmail(otp, userId);

        startPopupMesage.classList.add("show");
        startPopupMesage.textContent = data.message;
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);

      } catch (err) {
        startPopupMesage.classList.add("show");
        startPopupMesage.textContent = err.message;
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
      }
    }
  });

  // Input validation with real-time feedback using event deligation.
  authModals.addEventListener("input", (e) => {

    //flatening the three arrays to make all them in one array.
    const allFields = [...signInForm, ...signUpForm, ...verifyForm];
    const element = e.target;
    const id = element.id;
    const inputObj = allFields.find((obj) => obj.id === id);
    const commonSubmitBtn = authModals.querySelector(".common-submit-btn");

    if (!inputObj) return;

    const errElement = authModals.querySelector(`.${inputObj.errClassName}`);
    validateInputs(inputObj.pattern, element.value, inputObj.message, errElement, id, commonSubmitBtn, authModals);

    // Clear previous timer if user is still typing
    if (typingTimers.has(id)) {
      clearTimeout(typingTimers.get(id));
    }

    // Set timer to hide error after 5s of inactivity
    const timer = setTimeout(() => {
      errElement.classList.remove("show");
      errElement.textContent = "";
      typingTimers.delete(id);
    }, 5000);

    typingTimers.set(id, timer);
  });
});

window.addEventListener("load", async () => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
       startPopupMesage.classList.add("show");
        startPopupMesage.textContent = data.message;
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
        return;
    }
    window.location.href = "../pages/dashboard.html";
  } catch (err) {
     startPopupMesage.classList.add("show");
        startPopupMesage.textContent = "Login and get organized ever than before.";
        setTimeout(() => {
          startPopupMesage.classList.remove("show");
          startPopupMesage.textContent = "";
        }, 5000);
  }
});
