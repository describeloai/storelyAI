'use client';

import { useState } from 'react';
import { FileText, Link, Upload } from 'lucide-react';
import '@/components/dashboard/ui/AddInfoButton.css';
import { useDarkMode } from '@/context/DarkModeContext';
import { useUser } from '@clerk/nextjs';
import { useLanguage } from '@/context/LanguageContext';

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
  const { user, isLoaded } = useUser();
  const { t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    { key: 'text', label: t('addInfo.addTextManually'), icon: <FileText size={18} /> },
    { key: 'link', label: t('addInfo.addWebLink'), icon: <Link size={18} /> },
    { key: 'file', label: t('addInfo.uploadFile'), icon: <Upload size={18} /> },
  ];

  const handleSubmit = async () => {
    if (!isLoaded || !user || !user.id || isSubmitting) {
      console.error('Error: Usuario no autenticado o ID de usuario no disponible.');
      return;
    }

    setIsSubmitting(true);
    const currentUserId = user.id; // Obtenemos el ID de usuario real de Clerk

    try {
      if (selectedOption === 'text' && textInput) {
        await fetch('/api/brain/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId, // <--- ¡Enviamos el userId!
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
        await fetch('/api/brain/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId, // <--- ¡Enviamos el userId!
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
        formData.append('userId', currentUserId); // <--- ¡Enviamos el userId!
        formData.append('storeKey', storeKey);
        formData.append('type', 'file');
        if (folderId) formData.append('folderId', folderId);

        await fetch('/api/brain/items', {
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

  if (!isLoaded) {
    return (
      <button
        className="add-button"
        style={{ backgroundColor: '#999', color: '#fff', cursor: 'not-allowed' }}
        disabled
      >
        Cargando usuario...
      </button>
    );
  }

  if (!user) {
    return (
      <button
        className="add-button"
        style={{ backgroundColor: '#999', color: '#fff', cursor: 'not-allowed' }}
        disabled
        title="Inicia sesión para añadir información"
      >
        + Add info manually
      </button>
    );
  }

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
                <h2 className="modal-title">{t('addInfo.whatToAdd')}</h2>
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
                  ← {t('addInfo.back')}
                </button>

                {selectedOption === 'text' && (
                  <>
                    <h3>{t('addInfo.addText')}</h3>
                    <textarea
                      className="textarea"
                      placeholder={t('addInfo.typeContentPlaceholder')}
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
                    <h3>{t('addInfo.addLink')}</h3>
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
                    <h3>{t('addInfo.uploadFileTitle')}</h3>
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
                  {isSubmitting ? t('addInfo.saving') : t('addInfo.share')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}