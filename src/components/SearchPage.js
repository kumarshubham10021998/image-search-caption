import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImages, setSelectedImage } from '../redux/imageSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const images = useSelector((state) => state.images.images);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'Your Name';
    const storedEmail = localStorage.getItem('email') || 'Your Email';
    setName(storedName);
    setEmail(storedEmail);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=w99_90k8Ds20NEMv_Sv9UKoB0VsvB7djz9NCQA3MuMw`
      );
      dispatch(setImages(response.data.results));
      setError('');
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    }
  };

  const handleAddCaption = (image) => {
    dispatch(setSelectedImage(image));
    navigate('/caption');
  };

  const handleSaveUserInfo = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    alert('User information saved!');
  };

  return (
    <div className="search-page">
      <h1>Search Page</h1>

      <div className="user-info">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={handleSaveUserInfo}>Save</button>
      </div>

      <div className="user-display">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>

      <div className="search-bar">
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Enter your search term"
    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}  // Handle Enter key press
  />
  <button onClick={handleSearch}>Search</button>
</div>


      {error && <p className="error">{error}</p>}

      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-md-4">
            <button
              onClick={() => handleAddCaption(image)}
              className="image-button"
              style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
            >
              <img  className='mx-2' src={image.urls.small} alt={image.alt_description} />
            </button>
            <button onClick={() => handleAddCaption(image)} className="caption-button btn btn-primary my-2">
              Add Caption
            </button>
          </div>
          
        ))}
      </div>

    </div>
  );
};

export default SearchPage;
