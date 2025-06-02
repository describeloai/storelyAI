'use client';

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { FileText, Link, File, Trash2 } from 'lucide-react';
import { BrainItem } from '@/lib/db/schema';
import { useDarkMode } from '@/context/DarkModeContext';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

const filterOptions = ['all', 'text', 'link', 'file'] as const;
type FilterType = (typeof filterOptions)[number];

const KnowledgeList = forwardRef(function KnowledgeList(
  {
    storeKey,
    onItemDeleted,
  }: {
    storeKey: 'purple' | 'blue';
    onItemDeleted?: () => void;
  },
  ref
) {
  const { darkMode } = useDarkMode();

  const [items, setItems] = useState<BrainItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/brain?storeKey=${storeKey}`);
    const data = await res.json();
    const ordered = [...data.items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    setItems(ordered);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [storeKey]);

  useImperativeHandle(ref, () => ({
    refetch: fetchData,
  }));

  const handleDelete = async (id: string) => {
  console.log('🧠 Trying to delete ID:', id);
  const res = await fetch(`/api/brain/${id}`, { method: 'DELETE' });

  if (res.ok) {
    setItems(prev => prev.filter(i => i.id !== id));
    console.log('✅ Item deleted');
    if (onItemDeleted) onItemDeleted();
  } else {
    console.error('❌ Delete failed with status:', res.status);
  }
};
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    const payload = reordered.map((item, index) => ({
      id: item.id,
      position: index,
    }));

    await fetch('/api/brain/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: payload }),
    });
  };

  const filteredItems = filter === 'all' ? items : items.filter(i => i.type === filter);

  return (
    <>
      {/* Filtros */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid',
              borderColor: darkMode ? '#555' : '#ccc',
              backgroundColor:
                filter === option
                  ? darkMode
                    ? '#fff'
                    : '#371866'
                  : darkMode
                  ? '#333'
                  : '#fff',
              color:
                filter === option
                  ? darkMode
                    ? '#000'
                    : '#fff'
                  : darkMode
                  ? '#eee'
                  : '#333',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Contenedor elegante y fijo */}
      <div
        style={{
          borderRadius: '1.25rem',
          boxShadow: darkMode
            ? '0 6px 20px rgba(255, 255, 255, 0.05)'
            : '0 6px 20px rgba(0, 0, 0, 0.08)',
          background: darkMode ? '#1c1c1e' : '#fff',
          padding: '1.5rem',
          height: '260px',
          overflowY: 'auto',
          margin: '0 auto',
          width: '100%',
          maxWidth: '860px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {loading ? (
          <p style={{ textAlign: 'center', color: darkMode ? '#aaa' : '#888' }}>
            Loading knowledge...
          </p>
        ) : filteredItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: darkMode ? '#aaa' : '#888' }}>
            No knowledge in this filter.
          </p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredItems.map(item => (
                  <SortableItem key={item.id} item={item} onDelete={handleDelete} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </>
  );
});

export default KnowledgeList;

function SortableItem({ item, onDelete }: { item: BrainItem; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const { darkMode } = useDarkMode();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '1rem',
    borderRadius: '0.75rem',
    background: darkMode ? '#2c2c2e' : '#f5f5f5',
    color: darkMode ? '#eee' : '#000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'default',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Arrastrable solo a la izquierda */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          cursor: 'grab',
        }}
        {...listeners}
      >
        {item.type === 'text' && <FileText size={20} />}
        {item.type === 'link' && <Link size={20} />}
        {item.type === 'file' && <File size={20} />}
        <span
          title={item.title || item.content}
          style={{
            fontSize: '0.95rem',
            maxWidth: '460px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        >
          {item.title || item.content}
        </span>
      </div>

      {/* Botón de eliminar */}
      {/* Botón de eliminar */}
<button
  onClick={() => {
    console.log('🗑️ Delete button clicked:', item.id);
    onDelete(item.id);
  }}
  style={{
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    color: darkMode ? '#fff' : '#333', // ← color dinámico según tema
  }}
>
  <Trash2 size={16} />
</button>
    </div>
  );
}