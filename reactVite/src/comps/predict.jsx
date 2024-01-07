import  { useState } from 'react';

const MyPredict = () => {
  const [predictedClass, setPredictedClass] = useState(null);

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
    <div>
      <input type="file" onChange={handleFileChange} />
      {predictedClass && (
        <div>
          Predicted Class: {predictedClass}
        </div>
      )}
    </div>
  );
};

export default MyPredict;
