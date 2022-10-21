import React, { useState, useEffect } from 'react';

function ErrorHand({ errors, setErrors }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if(!errors){
     setVisible(false);
     return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000);
    // setErrors([]);
    return () => clearTimeout(timer);
  }, [errors]) 
  if(!visible) return null
  return (
    <div>
      {errors.length > 0 && (
        <ul style={{ color: "red", listStyleType: "none" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
   </div>
  )
}

export default ErrorHand;