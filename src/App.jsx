import { useState, useEffect } from 'react';
import './App.css'; // <--- Importante importar el archivo aquí

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevoApto, setNuevoApto] = useState({ title: '', location: '', price: '' });

  const fetchApartments = () => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(data);
        setCargando(false);
      })
      .catch(err => setCargando(false));
  };

  useEffect(() => { fetchApartments(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8080/api/apartment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoApto)
    })
    .then(res => res.json())
    .then(data => {
      setApartamentos([...apartamentos, data]);
      setNuevoApto({ title: '', location: '', price: '' });
    });
  };

  const eliminarApartamento = (id) => {
    if (window.confirm("¿Borrar?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => setApartamentos(apartamentos.filter(apt => apt.id !== id)));
    }
  };

  if (cargando) return <h2 className="header">Cargando...</h2>;

  return (
    <div className="container">
      <header className="header">
        <h1>🏢 Apartment Predictor</h1>
      </header>

      <section className="form-container">
        <h3>Añadir Nuevo Apartamento</h3>
        <form onSubmit={handleSubmit} className="apartment-form">
          <input 
            type="text" placeholder="Título" value={nuevoApto.title}
            onChange={(e) => setNuevoApto({...nuevoApto, title: e.target.value})}
            required 
          />
          <input 
            type="text" placeholder="Ubicación" value={nuevoApto.location}
            onChange={(e) => setNuevoApto({...nuevoApto, location: e.target.value})}
            required 
          />
          <input 
            type="number" placeholder="Precio" value={nuevoApto.price}
            onChange={(e) => setNuevoApto({...nuevoApto, price: e.target.value})}
            required 
          />
          <button type="submit" className="btn-save">➕ Guardar</button>
        </form>
      </section>

      <div className="grid-container">
        {apartamentos.map((apt) => (
          <div key={apt.id} className="card">
            <div>
              <h3>{apt.title}</h3>
              <p>📍 {apt.location}</p>
              <p className="price">💰 {apt.price} €</p>
            </div>
            <button onClick={() => eliminarApartamento(apt.id)} className="btn-delete">
              🗑️ Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;