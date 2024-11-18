import React, { useState, useEffect } from "react";
import { Dentista } from "../types";

interface DentistaFormProps {
  initialData?: Dentista;
  onSubmit: (dentista: Dentista) => Promise<void>;
  onUpdate?: (dentista: Dentista) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const DentistaForm: React.FC<DentistaFormProps> = ({
  initialData,
  onSubmit,
  onUpdate,
  onCancel,
  isEdit = false
}) => {
  const initialState: Dentista = {
    id: 0,
    nombre: "",
    apellido: "",
    especialidad: ""
  };

  const [formData, setFormData] = useState<Dentista>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isEdit && onUpdate) {
        await onUpdate(formData);
      } else {
        await onSubmit(formData);
      }
      
      if (!isEdit) {
        setFormData(initialState);
      }
      alert(isEdit ? 'Dentista actualizado exitosamente' : 'Dentista agregado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar dentista');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Editar' : 'Agregar Nuevo'} Dentista</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidad">Especialidad:</label>
          <input
            type="text"
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DentistaForm;