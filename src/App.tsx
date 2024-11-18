import React, { useState, useEffect } from 'react';
import { Dentista } from './types';
import DentistaForm from './components/dentistaForm';
import DentistaTable from './components/dentistaTable';


const App: React.FC = () => {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [selectedDentista, setSelectedDentista] = useState<Dentista | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDentistas();
  }, []);

  const fetchDentistas = async () => {
    try {
      console.log('Fetching dentistas...');
      const response = await fetch('/clinicadental/dentistas', {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching data: ${errorText}`);
      }
      const data = await response.json();
      setDentistas(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (dentista: Dentista) => {
    try {
      const response = await fetch('/clinicadental/dentistas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dentista)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error creating dentist: ${errorText}`);
      }
      await fetchDentistas();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleUpdate = async (dentista: Dentista) => {
    try {
      const response = await fetch(`/clinicadental/dentistas/${dentista.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dentista)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating dentist: ${errorText}`);
      }
      await fetchDentistas();
      setIsEditing(false);
      setSelectedDentista(undefined);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Está seguro de eliminar este dentista?')) return;
    
    try {
      const response = await fetch(`/clinicadental/dentistas/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting dentist: ${errorText}`);
      }
      await fetchDentistas();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (dentista: Dentista) => {
    setSelectedDentista(dentista);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedDentista(undefined);
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <h1>Gestión de Dentistas</h1>
      
      <DentistaForm
        initialData={selectedDentista}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
        isEdit={isEditing}
      />

      <DentistaTable
        dentistas={dentistas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;