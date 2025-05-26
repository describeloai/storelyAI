'use client';

import { useState } from 'react';
import { FileText, Link, Upload, Plug } from 'lucide-react';
import '@/components/dashboard/ui/AddInfoButton.css'; // Si usas CSS externo

export default function AddInfoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { key: 'text', label: 'Agregar texto manualmente', icon: <FileText size={18} /> },
    { key: 'link', label: 'Agregar enlace web', icon: <Link size={18} /> },
    { key: 'file', label: 'Subir archivo', icon: <Upload size={18} /> },
    { key: 'integration', label: 'Conectar una plataforma', icon: <Plug size={18} /> },
  ];

  return (
    <>
      <button className="add-button" onClick={() => setIsOpen(true)}>
        + Add info manually
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {!selectedOption ? (
              <div>
                <h2 className="modal-title">¿Qué deseas agregar?</h2>
                <div className="option-list">
                  {options.map(({ key, label, icon }) => (
                    <button key={key} className="option-button" onClick={() => setSelectedOption(key)}>
                      {icon}
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button className="back-button" onClick={() => setSelectedOption(null)}>← Volver</button>
                {selectedOption === 'text' && (
                  <>
                    <h3>Agregar texto</h3>
                    <textarea className="textarea" placeholder="Escribe tu contenido aquí..." />
                  </>
                )}
                {selectedOption === 'link' && (
                  <>
                    <h3>Agregar enlace</h3>
                    <input type="url" className="input" placeholder="https://ejemplo.com" />
                  </>
                )}
                {selectedOption === 'file' && (
                  <>
                    <h3>Subir archivo</h3>
                    <input type="file" className="input" />
                  </>
                )}
                {selectedOption === 'integration' && (
                  <>
                    <h3>Conectar plataforma</h3>
                    <p>Próximamente podrás conectar tu CMS, ecommerce, etc.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
