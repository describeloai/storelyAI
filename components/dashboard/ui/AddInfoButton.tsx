'use client';

import { useState } from 'react';
import { FileText, Link, Upload, Plug } from 'lucide-react';
import '@/components/dashboard/ui/AddInfoButton.css';

export default function AddInfoButton({ storeKey }: { storeKey: 'purple' | 'blue' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [textInput, setTextInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const options = [
    { key: 'text', label: 'Agregar texto manualmente', icon: <FileText size={18} /> },
    { key: 'link', label: 'Agregar enlace web', icon: <Link size={18} /> },
    { key: 'file', label: 'Subir archivo', icon: <Upload size={18} /> },
    { key: 'integration', label: 'Conectar una plataforma', icon: <Plug size={18} /> },
  ];

  const handleSubmit = async () => {
    if (!storeKey) return;

    const userId = 'demo-user'; // TODO: reemplazar por user real

    try {
      if (selectedOption === 'text' && textInput) {
        await fetch('/api/brain/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            storeKey,
            type: 'text',
            content: textInput,
            title: '',
            fileUrl: null,
          }),
        });
      }

      if (selectedOption === 'link' && linkInput) {
        await fetch('/api/brain/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            storeKey,
            type: 'link',
            content: linkInput,
            title: '',
            fileUrl: null,
          }),
        });
      }

      if (selectedOption === 'file' && file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('storeKey', storeKey);
        formData.append('type', 'file');

        await fetch('/api/brain/add', {
          method: 'POST',
          body: formData,
        });
      }

      // Reset UI
      setIsOpen(false);
      setSelectedOption(null);
      setTextInput('');
      setLinkInput('');
      setFile(null);
    } catch (err) {
      console.error('Error adding info:', err);
    }
  };

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
                    <textarea
                      className="textarea"
                      placeholder="Escribe tu contenido aquí..."
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                    />
                  </>
                )}

                {selectedOption === 'link' && (
                  <>
                    <h3>Agregar enlace</h3>
                    <input
                      type="url"
                      className="input"
                      placeholder="https://ejemplo.com"
                      value={linkInput}
                      onChange={e => setLinkInput(e.target.value)}
                    />
                  </>
                )}

                {selectedOption === 'file' && (
                  <>
                    <h3>Subir archivo</h3>
                    <input
                      type="file"
                      className="input"
                      onChange={e => setFile(e.target.files?.[0] || null)}
                    />
                  </>
                )}

                {selectedOption === 'integration' && (
                  <>
                    <h3>Conectar plataforma</h3>
                    <p>Próximamente podrás conectar tu CMS, ecommerce, etc.</p>
                  </>
                )}

                {selectedOption !== 'integration' && (
                  <button className="add-button" style={{ marginTop: '1rem' }} onClick={handleSubmit}>
                    Guardar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
