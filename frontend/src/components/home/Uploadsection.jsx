import React from 'react';
import './UploadForm.css';

const UploadForm = () => {
  return (
    <div className="upload-form">
      <h2>Upload Content to Analyze</h2>
      <form>
        <label>Text Content</label>
        <textarea placeholder="Paste text here..." rows="4" />

        <label>Upload Image</label>
        <input type="file" accept="image/*" />

        <label>Upload Video</label>
        <input type="file" accept="video/*" />

        <button type="submit">Analyze</button>
      </form>
    </div>
  );
};

export default UploadForm;
