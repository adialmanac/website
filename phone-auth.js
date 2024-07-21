// phone-auth.js
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase-config.js";

window.onload = () => {
  // Initialize reCAPTCHA
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
      // reCAPTCHA solved, allow phone number authentication
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      console.log('reCAPTCHA expired');
    }
  }, auth);
  recaptchaVerifier.render();

  // Send verification code
  const sendCodeButton = document.getElementById('send-code-button');
  sendCodeButton.addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone-number').value;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code.
        window.confirmationResult = confirmationResult;
        console.log('SMS sent');
      })
      .catch((error) => {
        document.getElementById('phone-auth-error').textContent = error.message;
      });
  });

  // Verify code
  const phoneAuthForm = document.getElementById('phone-auth-form');
  phoneAuthForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('verification-code').value;
    window.confirmationResult.confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log('User signed in:', user);
        window.location.href = 'index.html';
      })
      .catch((error) => {
        document.getElementById('phone-auth-error').textContent = error.message;
      });
  });
};
