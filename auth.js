// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config.js";

document.addEventListener('DOMContentLoaded', () => {
  // Register
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('User registered:', userCredential.user);
          window.location.href = 'index.html';
        })
        .catch(error => {
          document.getElementById('register-error').textContent = error.message;
        });
    });
  }

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('User logged in:', userCredential.user);
          window.location.href = 'index.html';
        })
        .catch(error => {
          document.getElementById('login-error').textContent = error.message;
        });
    });
  }
});
