import React, {useState} from 'react'; 
import './App.css' 

function App(){
  const [formData,setFormData] = useState({name:'',location:''})
  const [businessData,setBusinessData] = useState(null);

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});

  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/business-data',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    const data = await response.json();
    setBusinessData(data);
  }

   const regenerateHeadline = async () => {
    const response = await fetch(`http://localhost:5000/regenerate-headline?name=${formData.name}&location=${formData.location}`);
    const data = await response.json();
    setBusinessData({ ...businessData, headline: data.headline });
  };

  
  return (
    <div className="container">
      <h1>📈 Local Business Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Business Name" value={formData.name} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      {businessData && (
        <div className="card">
          <h2>{formData.name}</h2>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Google Rating:</strong> {businessData.rating}★</p>
          <p><strong>Reviews:</strong> {businessData.reviews}</p>
          <p><strong>SEO Headline:</strong> {businessData.headline}</p>
          <button onClick={regenerateHeadline}>Regenerate SEO Headline</button>
        </div>
      )}
    </div>
  );

}
export default App