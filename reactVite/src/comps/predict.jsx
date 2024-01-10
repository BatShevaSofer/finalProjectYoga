// import  { useState } from 'react';

// const MyPredict = () => {
//   const [predictedClass, setPredictedClass] = useState(null);

//   const handleFileUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       setPredictedClass(data.predicted_class);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       handleFileUpload(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       {predictedClass && (
//         <div>
//           Predicted Class: {predictedClass}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPredict;

import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';

const MyPredict = () => {
  const [predictedClass, setPredictedClass] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPredictedClass(data.predicted_class);

      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Container maxWidth="sm" textAlign="center" marginTop={4}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
      <Button variant="contained" component="span" sx={{ color: '#ff69b4' }}>
  Upload Image
</Button>

      </label>
      {imageURL && (
        <div>
          <img src={imageURL} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '20px' }} />
        </div>
      )}
      {predictedClass && (
        <Typography variant="h6" style={{ color: '#ff69b4', marginTop: '10px' }}>
          Predicted Class: {predictedClass}
        </Typography>
      )}
    </Container>
  );
};

export default MyPredict;
