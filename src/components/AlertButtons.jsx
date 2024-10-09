// src/components/AlertButtons.jsx
import React from 'react';
import { alertDialog, confirmDialog, promptDialog, successDialog, errorDialog, warningDialog, infoDialog, questionDialog } from '../helpers/alerts';

const AlertButtons = () => {
  const handleAlert = () => alertDialog();
  const handleConfirm = () => {
    confirmDialog().then((result) => {
      if (result.isConfirmed) {
        successDialog('You confirmed the action!');
      }
    });
  };
  const handlePrompt = () => {
    promptDialog().then((result) => {
      if (result.value) {
        infoDialog(`You entered: ${result.value}`);
      }
    });
  };
  const handleSuccess = () => successDialog();
  const handleError = () => errorDialog();
  const handleWarning = () => warningDialog();
  const handleInfo = () => infoDialog();
  const handleQuestion = () => {
    questionDialog().then((result) => {
      if (result.isConfirmed) {
        infoDialog('You have a question!');
      }
    });
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <button onClick={handleAlert}>Alert Dialog</button>
      <button onClick={handleConfirm}>Confirm Dialog</button>
      <button onClick={handlePrompt}>Prompt Dialog</button>
      <button onClick={handleSuccess}>Success Dialog</button>
      <button onClick={handleError}>Error Dialog</button>
      <button onClick={handleWarning}>Warning Dialog</button>
      <button onClick={handleInfo}>Info Dialog</button>
      <button onClick={handleQuestion}>Question Dialog</button>
    </div>
  );
};

export default AlertButtons;
