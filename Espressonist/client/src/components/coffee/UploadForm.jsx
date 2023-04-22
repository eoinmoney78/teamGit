import React, { useRef } from 'react';
import { Button } from '@mui/material';

function UploadForm({ onUpload }) {
  const inputRef = useRef();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      console.log('Fetching upload URL...');

      const response = await fetch('/generate-upload-url');
      if (!response.ok) {
        throw new Error('Failed to fetch upload URL');
      }

      const jsonResponse = await response.json(); // Parse the response as JSON
      console.log('JSON Response:', jsonResponse);

      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message || 'Unknown error');
      }

      const uploadURL = jsonResponse.uploadURL;
      console.log('Upload URL:', uploadURL);

      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      console.log('Upload Response:', uploadResponse);

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload the file');
      }

      alert('Image uploaded successfully');
      const publicURL = uploadURL.split('?')[0];
      onUpload(publicURL);
    } catch (error) {
      console.error('Upload error:', error.message);
      alert('Image upload failed');
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" hidden accept="image/*" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={() => inputRef.current.click()}>
        Upload Image
      </Button>
    </div>
  );
}

export default UploadForm;
