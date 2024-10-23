import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import '../styles/CaptionPage.css'; 

const CaptionPage = () => {
  const selectedImage = useSelector((state) => state.images.selectedImage); 
  const [caption, setCaption] = useState(''); 
  const imageRef = useRef(null); 

  if (!selectedImage) return <p>No image selected!</p>;

  const handleDownload = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const canvas = await html2canvas(imageRef.current, {
        useCORS: true,
        allowTaint: false,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'image_with_caption.png';
      link.click();
    } catch (error) {
      console.error('Failed to download the image:', error);
    }
  };

  return (
    <div className="caption-page">
      <h1>Add Caption Page</h1>
      <div className="content">
        <div className="image-container" ref={imageRef}>
          <img 
            src={selectedImage.urls.small} 
            alt={selectedImage.alt_description} 
            crossOrigin="anonymous" 
          />
          <p className="caption-text">{caption}</p>
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Enter your caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button onClick={() => setCaption(caption)}>Add Caption</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default CaptionPage;
