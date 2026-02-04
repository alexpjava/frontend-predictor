import { useState, useEffect } from 'react'
import './App.css'

// Componente Hijo que recibe PROPS (Objetos)
const TarjetaApartamento = ({ datos }) => {
  return (
    <div className="card">
      <h2>Resultado de la Predicción</h2>
      <p>Ciudad: {datos.ciudad}</p>
      <p>Precio Estimado: <strong>{datos.precio} €</strong></p>
    </div>
  )
}

function App() {
  // 1. Estado inicial (un objeto literal vacío)
  const [prediccion, setPrediccion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 2. Llamada al Backend de Java (Puerto 8080)
    fetch('http://localhost:8080/api/apartamentos/1') // Ajusta a tu ruta real
      .then(response => response.json())
      .then(data => {
        // 3. ACTUALIZACIÓN INMUTABLE
        // No hacemos prediccion = data; 
        // Usamos setPrediccion para darle a React un objeto NUEVO
        setPrediccion(data);
        setCargando(false);
      })
      .catch(error => console.error("Error conectando al backend:", error));
  }, []);

  return (
    <>
      <h1>Apartment Predictor</h1>
      
      {cargando ? (
        <p>Conectando con el servidor de Java...</p>
      ) : (
        // 4. Pasamos el objeto 'prediccion' como PROP al hijo
        <TarjetaApartamento datos={prediccion} />
      )}
    </>
  )
}

export default App