import React from 'react';
import { Dentista } from '../types';

interface DentistaTableProps {
  dentistas: Dentista[];
  onEdit: (dentista: Dentista) => void;
  onDelete: (id: number) => void;
}

const DentistaTable: React.FC<DentistaTableProps> = ({ dentistas, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <h2>Lista de Dentistas</h2>
      <table className="dentista-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dentistas.map((dentista) => (
            <tr key={dentista.id}>
              <td>{dentista.id}</td>
              <td>{dentista.nombre}</td>
              <td>{dentista.apellido}</td>
              <td>{dentista.especialidad}</td>
              <td>
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(dentista)}
                >
                  Editar
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(dentista.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {dentistas.length === 0 && (
        <p className="no-data">No hay dentistas registrados</p>
      )}
    </div>
  );
};

export default DentistaTable;