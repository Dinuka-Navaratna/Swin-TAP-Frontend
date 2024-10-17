import React, { useState, useEffect } from "react";
import axios from "axios";
import { successDialog, errorDialog } from "../../helpers/alerts.js";
import { getSession } from '../../actions/session';
import uploadFile from '../../helpers/uploadFile.js';

const handleNewDocument = async (token, setDocuments, setDocumentIds, type) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*';
  input.onchange = async (inputEvent) => {
    const file = inputEvent.target.files[0];
    if (file) {
      try {
        const response = await uploadFile(file, token);
        if (response.status) {
          const newDocument = {
            id: response.data._id,
            name: file.name,
          };
          setDocuments(prevDocuments => {
            const isDuplicate = prevDocuments.some(doc => doc.id === newDocument.id);
            return isDuplicate ? prevDocuments : [...prevDocuments, newDocument];
          });
          setDocumentIds(prevIds => {
            const newIds = Array.isArray(prevIds) ? prevIds : [];
            if (!newIds.includes(response.data._id)) {
              newIds.push(response.data._id);
              updateUserFiles(newIds, type).catch(err => errorDialog('Failed to update user files: ' + err));
            }
            return newIds;
          });
          successDialog('File uploaded successfully');
        } else {
          errorDialog('File upload error!');
        }
      } catch (err) {
        errorDialog('Failed to upload file: ' + err);
      }
    }
  };
  input.click();
};

const handleDeleteDocument = async (token, setDocuments, setDocumentIds, type, docId) => {
  try {
    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== docId));
    setDocumentIds(prevIds => {
      const newIds = Array.isArray(prevIds) ? prevIds.filter(id => id !== docId) : [];
      updateUserFiles(newIds, type).catch(err => errorDialog('Failed to update user files: ' + err));
      return newIds;
    });
    successDialog('File deleted successfully');
  } catch (err) {
    errorDialog('Failed to delete file: ' + err.message);
  }
};

const updateUserFiles = async (newIds, type) => {
  const session = getSession();
  if (!session) {
    return ('Session not found!');
  }

  const data = JSON.stringify({
    "_id": session.user_id,
    [type]: newIds
  });

  const config = {
    method: 'PUT',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL}/api/users/`,
    headers: {
      'Authorization': `Token ${session.token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    if (response.data.status === false) {
      return response.data.msg;
    } else {
      return true;
    }
  } catch (error) {
    return ("An error occurred while updating the documents: " + error);
  }
};

const DocumentUpload = (props) => {
  const { type, token, uploadedDocs } = props;
  const [documents, setDocuments] = useState([]);
  const [documentIds, setDocumentIds] = useState([]);

  useEffect(() => {
    if (uploadedDocs.length > 0) {
      const uniqueDocs = uploadedDocs.reduce((unique, doc) => {
        if (!unique.some(d => d.id === doc._id)) {
          unique.push({ id: doc._id, name: doc.original_filename });
        }
        return unique;
      }, []);
      setDocuments(uniqueDocs);
      setDocumentIds(uniqueDocs.map(doc => doc.id));
    }
  }, [uploadedDocs]);

  return (
    <div className="card border-primary">
      <h6 className="card-header d-flex align-items-center justify-content-between">
        <span>
          <i className="bi bi-file-text-fill"></i> {type === "identity_verification_documents" ? "Identity Verification Documents" : "Skill Verification Documents"}
        </span>
        <button className="btn btn-sm btn-primary float-end" onClick={() => handleNewDocument(token, setDocuments, setDocumentIds, type)}>
          <i className="bi bi-plus-lg text-light"></i>
        </button>
      </h6>
      <ul className="list-group list-group-flush">
        {documents.map((doc) => (
          <li key={doc.id} className="list-group-item">
            <i className="bi bi-file-earmark-check"></i> {doc.name}
            <button type="button" className="btn btn-sm ms-3" onClick={() => handleDeleteDocument(token, setDocuments, setDocumentIds, type, doc.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentUpload;
