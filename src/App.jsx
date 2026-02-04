import { useState, useEffect } from 'react';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado para el formulario (Objeto literal)
  const [nuevoApto, setNuevoApto] = useState({
    title: '',
    location: '',
    price: ''
  });

  const fetchApartments = () => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(data);
        setCargando(false);
      })
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  // Función para manejar el POST
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    fetch('http://127.0.0.1:8080/api/apartment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoApto)
    })
    .then(res => res.json())
    .then(data => {
      // Actualización inmutable: añadimos el nuevo al array existente
      setApartamentos([...apartamentos, data]);
      // Limpiamos el formulario
      setNuevoApto({ title: '', location: '', price: '' });
    })
    .catch(err => alert("Error al crear: " + err));
  };

  const eliminarApartamento = (id) => {
    if (window.confirm("¿Borrar?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => setApartamentos(apartamentos.filter(apt => apt.id !== id)));
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🏢 Apartment Predictor</h1>
      </header>

      {/* --- SECCIÓN DEL FORMULARIO --- */}
      <section style={{ 
        maxWidth: '600px', 
        margin: '0 auto 40px auto', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
      }}>
        <h3 style={{ marginTop: 0 }}>Añadir Nuevo Apartamento</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Título (ej: Ático de lujo)" 
            value={nuevoApto.title}
            onChange={(e) => setNuevoApto({...nuevoApto, title: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <input 
            type="text" 
            placeholder="Ubicación (ej: Barcelona)" 
            value={nuevoApto.location}
            onChange={(e) => setNuevoApto({...nuevoApto, location: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <input 
            type="number" 
            placeholder="Precio (€)" 
            value={nuevoApto.price}
            onChange={(e) => setNuevoApto({...nuevoApto, price: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <button type="submit" style={{ 
            padding: '10px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            ➕ Guardar Apartamento
          </button>
        </form>
      </section>

      <hr />

      {/* --- LISTADO DE TARJETAS --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {apartamentos.map((apt) => (
          <div key={apt.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', borderLeft: '5px solid #3498db' }}>
            <h3>{apt.title}</h3>
            <p>📍 {apt.location}</p>
            <p style={{ color: '#27ae60', fontWeight: 'bold' }}>💰 {apt.price} €</p>
            <button onClick={() => eliminarApartamento(apt.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
              🗑️ Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;