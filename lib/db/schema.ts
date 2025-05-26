export type BrainItem = {
  id: string;
  userId: string;
  storeKey: 'purple' | 'blue';
  type: 'text' | 'link' | 'file';
  title?: string;
  content: string;
  fileUrl?: string | null; // ✅ permite string o null
  createdAt: string;
};
