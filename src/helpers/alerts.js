import Swal from 'sweetalert2';

// Alert Dialog
export const alertDialog = (message) => {
  return Swal.fire({
    title: 'Alert',
    html: message,
    icon: 'info',
    confirmButtonText: 'OK'
  });
};

// Confirm Dialog
export const confirmDialog = (message) => {
  return Swal.fire({
    title: 'Confirm',
    html: message,
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
export const successDialog = (message) => {
  return Swal.fire({
    title: 'Success',
    html: message,
    icon: 'success',
    confirmButtonText: 'OK',
    allowOutsideClick: false,  // Prevent closing by clicking outside
    allowEscapeKey: false,     // Prevent closing by pressing the escape key
    returnFocus: false         // Prevent dialog from closing due to focus loss
  });
};


// Error Dialog
export const errorDialog = (message) => {
  return Swal.fire({
    title: 'Error',
    html: message,
    icon: 'error',
    confirmButtonText: 'OK'
  });
};

// Warning Dialog
export const warningDialog = (message) => {
  return Swal.fire({
    title: 'Warning',
    html: message,
    icon: 'warning',
    confirmButtonText: 'OK'
  });
};

// Info Dialog
export const infoDialog = (message) => {
  return Swal.fire({
    title: 'Info',
    html: message,
    icon: 'info',
    confirmButtonText: 'OK'
  });
};

// Question Dialog
export const questionDialog = (message) => {
  return Swal.fire({
    title: 'Question',
    html: message,
    icon: 'question',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonText: 'No'
  });
};
