'use client';

import { useState } from 'react';
import { FileText, Link, Upload } from 'lucide-react';
import '@/components/dashboard/ui/AddInfoButton.css';
import { useDarkMode } from '@/context/DarkModeContext';

export default function AddInfoButton({
  storeKey,
  folderId,
  onInfoAdded,
}: {
  storeKey: 'purple' | 'blue';
  folderId?: string | null;
  onInfoAdded?: () => void;
}) {
  const { darkMode } = useDarkMode();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 👈 NEW

  const options = [
    { key: 'text', label: 'Agregar texto manualmente', icon: <FileText size={18} /> },
    { key: 'link', label: 'Agregar enlace web', icon: <Link size={18} /> },
    { key: 'file', label: 'Subir archivo', icon: <Upload size={18} /> },
  ];

  const handleSubmit = async () => {
    if (!storeKey || isSubmitting) return;

    setIsSubmitting(true);
    const userId = 'demo-user';

    try {
      if (selectedOption === 'text' && textInput) {
        await fetch('/api/brain/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            storeKey,
            folderId: folderId || null,
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
            folderId: folderId || null,
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
        if (folderId) formData.append('folderId', folderId);

        await fetch('/api/brain/add', {
          method: 'POST',
          body: formData,
        });
      }

      if (onInfoAdded) onInfoAdded();

      // Reset
      setIsOpen(false);
      setSelectedOption(null);
      setTextInput('');
      setLinkInput('');
      setFile(null);
    } catch (err) {
      console.error('Error adding info:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="add-button"
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: '#371866', color: '#fff' }}
      >
        + Add info manually
      </button>

      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: darkMode ? '#1c1c1c' : '#fff',
              color: darkMode ? '#f4f4f5' : '#111',
              boxShadow: darkMode ? '0 8px 30px rgba(0,0,0,0.5)' : '0 8px 30px rgba(0,0,0,0.1)',
            }}
          >
            {!selectedOption ? (
              <div>
                <h2 className="modal-title">¿Qué deseas agregar?</h2>
                <div className="option-list">
                  {options.map(({ key, label, icon }) => (
                    <button
                      key={key}
                      className="option-button"
                      onClick={() => setSelectedOption(key)}
                      style={{
                        backgroundColor: darkMode ? '#2a2a2a' : '#f9f9f9',
                        color: darkMode ? '#eee' : '#111',
                      }}
                    >
                      {icon}
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button
                  className="back-button"
                  onClick={() => setSelectedOption(null)}
                  style={{ color: darkMode ? '#ccc' : '#333' }}
                >
                  ← Volver
                </button>

                {selectedOption === 'text' && (
                  <>
                    <h3>Agregar texto</h3>
                    <textarea
                      className="textarea"
                      placeholder="Escribe tu contenido aquí..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      style={{
                        backgroundColor: darkMode ? '#2a2a2a' : '#fff',
                        color: darkMode ? '#eee' : '#111',
                        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                      }}
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
                      onChange={(e) => setLinkInput(e.target.value)}
                      style={{
                        backgroundColor: darkMode ? '#2a2a2a' : '#fff',
                        color: darkMode ? '#eee' : '#111',
                        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                      }}
                    />
                  </>
                )}

                {selectedOption === 'file' && (
                  <>
                    <h3>Subir archivo</h3>
                    <input
                      type="file"
                      className="input"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      style={{
                        backgroundColor: darkMode ? '#2a2a2a' : '#fff',
                        color: darkMode ? '#eee' : '#111',
                        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                      }}
                    />
                  </>
                )}

                <button
                  className="add-button"
                  style={{
                    marginTop: '1rem',
                    backgroundColor: isSubmitting ? '#999' : '#371866',
                    color: '#fff',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Share'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
