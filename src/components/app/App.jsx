import React, { useState } from 'react';

export default function App() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');


  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'uploadexample');
    setLoading(true);

    const res = 
      await fetch('https://api.cloudinary.com/v1_1/df3ajcohw/image/upload', 
        {
          method: 'POST',
          body: data
        });

    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);

    console.log(file);

  };

  return (
    <div className="App">
      <h1>Upload An Image</h1>
      <input 
        type="file" 
        placeholder="Upload An Image Here" 
        onChange={uploadImage}/>

      {
        loading ? 
          (<h3>Loading...</h3>) :
          (<img src={image} style={{ width:'300px' }}/>)
      }
    </div>
  );
}
