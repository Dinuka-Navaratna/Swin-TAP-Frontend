// src/helpers/alerts.js
import Swal from 'sweetalert2';

// Alert Dialog
export const alertDialog = (message = 'This is a basic alert!') => {
  Swal.fire({
    title: 'Alert',
    text: message,
    icon: 'info',
    confirmButtonText: 'OK'
  });
};

// Confirm Dialog
export const confirmDialog = (message = 'Are you sure you want to proceed?') => {
  return Swal.fire({
    title: 'Confirm',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, do it!',
    cancelButtonText: 'No, cancel'
  });
};

// Prompt Dialog
export const promptDialog = () => {
  return Swal.fire({
    title: 'Enter your name',
    input: 'text',
    inputPlaceholder: 'Enter your name',
    showCancelButton: true
  });
};

// Success Dialog
export const successDialog = (message = 'Operation completed successfully!') => {
  Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

// Error Dialog
export const errorDialog = (message = 'An error occurred!') => {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'OK'
  });
};

// Warning Dialog
export const warningDialog = (message = 'This is a warning message!') => {
  Swal.fire({
    title: 'Warning',
    text: message,
    icon: 'warning',
    confirmButtonText: 'OK'
  });
};

// Info Dialog
export const infoDialog = (message = 'This is an information message!') => {
  Swal.fire({
    title: 'Info',
    text: message,
    icon: 'info',
    confirmButtonText: 'OK'
  });
};

// Question Dialog
export const questionDialog = (message = 'Do you have any questions?') => {
  Swal.fire({
    title: 'Question',
    text: message,
    icon: 'question',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonText: 'No'
  });
};
