'use client';

import { useEffect, useState } from 'react';
import { FileText, Link, File, Trash2 } from 'lucide-react';
import { BrainItem } from '@/lib/db/schema';

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

export default function KnowledgeList({ storeKey }: { storeKey: 'purple' | 'blue' }) {
  const [items, setItems] = useState<BrainItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/brain?storeKey=${storeKey}`);
      const data = await res.json();
      const ordered = [...data.items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      setItems(ordered);
      setLoading(false);
    };

    fetchData();
  }, [storeKey]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/brain/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== id));
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
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid #ccc',
              backgroundColor: filter === option ? '#371866' : '#fff',
              color: filter === option ? '#fff' : '#333',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '1.5rem',
        paddingRight: '0.5rem',
        scrollbarGutter: 'stable',
      }}>
        {loading ? (
          <p>Cargando conocimientos...</p>
        ) : filteredItems.length === 0 ? (
          <p>No knowledge in this filter.</p>
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
}

function SortableItem({ item, onDelete }: { item: BrainItem; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '1rem',
    borderRadius: '0.75rem',
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {item.type === 'text' && <FileText size={20} />}
        {item.type === 'link' && <Link size={20} />}
        {item.type === 'file' && <File size={20} />}
        <span style={{ fontSize: '0.95rem' }}>{item.title || item.content}</span>
      </div>
      <button onClick={() => onDelete(item.id)}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}
