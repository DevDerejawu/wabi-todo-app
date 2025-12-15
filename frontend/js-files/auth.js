import { baseUrl } from "./dashboardNavSections.js";
export const signUpForm = [
  {
    type: "text",
    placeholder: "Enter your name",
    id: "sign-up-name",
    labelText: "Full Name",
    errClassName: "sign-up-name-err",
    pattern: "^(?=.{5,})([A-Z][a-z]+) ([A-Z][a-z]+)$",
    message:
      "Start each name with an uppercase letter, follow with lowercase letters, and separate the two names with a space and at least 5 character..",
  },
  {
    type: "email",
    placeholder: "Enter your email",
    id: "sign-up-email",
    labelText: "Email",
    errClassName: "sign-up-email-err",
    pattern: "^[^\\s@]+@[^\\s@]+\\.(com|org|net)$",
    message: "Follow the standard email format.",
  },
  {
    type: "password",
    placeholder: "Enter a strong password",
    id: "sign-up-password",
    labelText: "Password",
    errClassName: "sign-up-password-err",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{5,}$",
    message: "Include uppercase, lowercase, number, and at least 5 characters.",
  },
];

export const signInForm = [
  {
    type: "email",
    placeholder: "Enter your email",
    id: "sign-in-email",
    labelText: "Email",
    errClassName: "sign-in-email-err",
    pattern: "^[^\\s@]+@[^\\s@]+\\.(com|org|net)$",
    message: "Follow the standard email format.",
  },
  {
    type: "password",
    placeholder: "Enter your password",
    id: "sign-in-password",
    labelText: "Password",
    errClassName: "sign-in-password-err",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{5,}$",
    message: "Include uppercase, lowercase, number, and at least 5 characters.",
  },
];

export const verifyForm = [
  {
    type: "password",
    placeholder: "Enter your OTP",
    id: "verify-otp",
    labelText: "Enter OTP code.",
    errClassName: "verify-otp-err",
    pattern: "^\\d{6}$",
    message: "Enter the 6-digit OTP sent to your email.",
  },
];

//usdet to create the modal for signing in or signing up or verifiying email
export function renderForm(formFields, headingText, submitClass) {
  const headingPart = `
      <button class="close-loggin-btn" id="close-modal-btn">&times;</button>
      <h2>${headingText}</h2>
  `;

  // Inputs used to store the input fields based on formFields' length.
  let inputs = "";

  formFields.forEach(({ labelText, placeholder, type, id, errClassName }) => {
    inputs += `
    <div>
      <div class="form-group ${type === "password" ? "password-group" : ""}">
        <label for="${id}">${labelText}</label>
        <input id="${id}" type="${type}" placeholder="${placeholder}" required>
        ${type === "password" ? `<span class="toggle-password">👁️</span>` : ""}
      </div>
       <p class="error-msg ${errClassName}"></p>
    </div>
    `;
  });

  // full form for signing in, signing up
  return `
    ${headingPart}
      ${inputs}
      ${
        headingText === "Sign In"
          ? `<p class="forgot-password">Forgot Password?</p>`
          : ""
      }
      <button class="common-submit-btn disabled ${submitClass}">
        ${headingText}
      </button>

      ${
        headingText === "Verify"
          ? ""
          : `<p class="common-text-style">
        ${
          headingText === "Sign In"
            ? `Don't have an account? <span class="sign-up common-alt-btn-style">Sign Up</span>`
            : `Already have an account? <span class="sign-in common-alt-btn-style">Sign In</span>`
        }
      </p>`
      }
  `;
}

//sending data to back end and return the data that is sent from backend.
export async function sendRegisteringData(
  passwordValue,
  emailValue,
  nameValue
) {
  try {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err.message;
  }
}

//send login data to backend and return the data that is sent from backend.
export async function sendLogingData(passwordValue, emailValue) {
  try {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
       credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err.message;
  }
}

//used to validate input fields with real time feedback.
export function validateInputs(
  pattern,
  value,
  message,
  errElement,
  id,
  commonSubmitBtn,
  authModals
) {
  identifyTypeOfForm(id, commonSubmitBtn, authModals);

  //use built in RegExp sinve regular expression patterns are wrapped in string.
  const regex = new RegExp(pattern);
  if (!regex.test(value)) {
    errElement.textContent = message || "Invalid input";
    errElement.classList.add("show");
  } else {
    errElement.textContent = "Perfect it is enough.";
    errElement.style.color = "green";
    setTimeout(() => {
      errElement.classList.remove("show");
      errElement.textContent = "";
      errElement.style.removeProperty("color");
    }, 1000);
  }
}

//identifing weather the form is sign in , sign up or verifing since all these things use the same style and container.
function identifyTypeOfForm(id, commonSubmitBtn, authModals) {
  let formType = null;

  if (id.includes("sign-in")) {
    formType = signInForm;
  } else if (id.includes("sign-up")) {
    formType = signUpForm;
  } else if (id.includes("verify")) {
    formType = verifyForm;
  }

  if (!formType) return;

  const inputs = authModals.querySelectorAll("input");
  validateSubmitBtn(formType, inputs, commonSubmitBtn);
}

//make the submit btn disabled if input fields are not validated or not pass the pattern.
//the main goal of this function is to get all inputs using one input's id and then check if all inputs pass the pattern, if it passes,  the submit button becomes active, otherwise not.;
function validateSubmitBtn(formType, inputs, commonSubmitBtn) {
  //used to accumulate list of 0 and 1.
  // 0 => there is an input that doesn't pass the validation.
  // 0 => there is an input that is validated and pass the pattern.
  const results = [];

  inputs.forEach((input) => {
    const oneInputObj = formType.find((obj) => obj.id === input.id);

    if (!oneInputObj) return;

    const regex = new RegExp(oneInputObj.pattern);

    if (regex.test(input.value)) {
      results.push(1);
    } else {
      results.push(0);
    }
  });

  // if there 1 or more inputs that doesn't pass the pattern, add disabled class to make the button inactive, otherwise make it active and ready to submission;
  if (results.includes(0)) {
    commonSubmitBtn.classList.add("disabled");
  } else {
    commonSubmitBtn.classList.remove("disabled");
  }
}

//used to verify that the email is sent to a user.
export async function verifyEmail(otp, userId) {
  try {
    const res = await fetch(`${baseUrl}/api/auth/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId,
        otp,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err.message;
  }
}
