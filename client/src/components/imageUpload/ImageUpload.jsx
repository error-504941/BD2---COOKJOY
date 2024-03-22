import React, { useState } from 'react';
import './ImageUpload.css'

const ImageUploadComponent = ({dafaultImage = "", callbackImage}) => {
  const [imageSrc, setImageSrc] = useState(dafaultImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageSrc(event.target.result);
        callbackImage(file.name, file.type, event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      <h2>Carica un'immagine</h2>
      <input type="file" onChange={handleImageChange} />
      {imageSrc && <div className='image-container'><img src={imageSrc} alt="immagine caricata" /></div>}
    </div>
  );
};

export default ImageUploadComponent;
