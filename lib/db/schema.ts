export type BrainItem = {
  id: string;
  userId: string;
  storeKey: 'purple' | 'blue';
  type: 'text' | 'link' | 'file';
  title?: string;
  content: string;
  fileUrl?: string | null;
  folderId?: string | null; // Aquí la propiedad folderId que faltaba
  createdAt: string;
};
