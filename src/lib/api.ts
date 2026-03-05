const API_BASE = '/api';

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'API error');
  }
  return res.json();
}

// Types
export interface Course {
  id: number;
  title: string;
  description: string | null;
  benefits: string | null;
  cover_image_url: string | null;
  price: number;
  level: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  full_name: string;
  position: string | null;
  bio: string | null;
  expertise: string | null;
  experience: string | null;
  photo_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  author_name: string;
  rating: number;
  comment: string | null;
  author_avatar_url: string | null;
  course_id: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: number;
  full_name: string;
  phone: string | null;
  email: string | null;
  promo_code: string | null;
  consent_policy: boolean;
  consent_offers: boolean;
  source: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value: string | null;
  updated_at: string;
}

export interface MediaFile {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  uploaded_by: number | null;
  created_at: string;
}

// Courses
export const getCourses = () => apiFetch<Course[]>('/courses');
export const getCourse = (id: number) => apiFetch<Course>(`/courses/${id}`);
export const createCourse = (data: Partial<Course>) => apiFetch<Course>('/courses', { method: 'POST', body: JSON.stringify(data) });
export const updateCourse = (id: number, data: Partial<Course>) => apiFetch<Course>(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCourse = (id: number) => apiFetch<{ success: boolean }>(`/courses/${id}`, { method: 'DELETE' });

// Teachers
export const getTeachers = (published?: boolean) => apiFetch<Teacher[]>(`/teachers${published !== undefined ? `?published=${published}` : ''}`);
export const createTeacher = (data: Partial<Teacher>) => apiFetch<Teacher>('/teachers', { method: 'POST', body: JSON.stringify(data) });
export const updateTeacher = (id: number, data: Partial<Teacher>) => apiFetch<Teacher>(`/teachers/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const toggleTeacherPublish = (id: number, is_published: boolean) => apiFetch<Teacher>(`/teachers/${id}/publish`, { method: 'PATCH', body: JSON.stringify({ is_published }) });
export const deleteTeacher = (id: number) => apiFetch<{ success: boolean }>(`/teachers/${id}`, { method: 'DELETE' });

// Reviews
export const getReviews = (published?: boolean) => apiFetch<Review[]>(`/reviews${published !== undefined ? `?published=${published}` : ''}`);
export const createReview = (data: Partial<Review>) => apiFetch<Review>('/reviews', { method: 'POST', body: JSON.stringify(data) });
export const updateReview = (id: number, data: Partial<Review>) => apiFetch<Review>(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const toggleReviewPublish = (id: number, is_published: boolean) => apiFetch<Review>(`/reviews/${id}/publish`, { method: 'PATCH', body: JSON.stringify({ is_published }) });
export const deleteReview = (id: number) => apiFetch<{ success: boolean }>(`/reviews/${id}`, { method: 'DELETE' });

// Leads
export const getLeads = () => apiFetch<Lead[]>('/leads');
export const createLead = (data: Partial<Lead>) => apiFetch<Lead>('/leads', { method: 'POST', body: JSON.stringify(data) });

// Users
export const getUsers = () => apiFetch<User[]>('/users');
export const createUser = (data: Partial<User>) => apiFetch<User>('/users', { method: 'POST', body: JSON.stringify(data) });
export const deleteUser = (id: number) => apiFetch<{ success: boolean }>(`/users/${id}`, { method: 'DELETE' });

// Settings
export const getSettings = () => apiFetch<SiteSetting[]>('/settings');
export const updateSetting = (key: string, value: string) => apiFetch<SiteSetting>(`/settings/${key}`, { method: 'PUT', body: JSON.stringify({ setting_value: value }) });

// Media
export const getMedia = () => apiFetch<MediaFile[]>('/media');
export const uploadMedia = async (file: File): Promise<MediaFile> => {
  const formData = new FormData();
  formData.append('file', file);
  // Не устанавливаем Content-Type — браузер сам выставит multipart/form-data с boundary
  const res = await fetch(`${API_BASE}/media/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Upload failed');
  }
  return res.json();
};

export const uploadToPath = async (file: File): Promise<{ publicUrl: string; filename: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/media/upload-to-path`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Upload failed');
  }
  return res.json();
};
export const deleteMedia = (id: number) => apiFetch<{ success: boolean }>(`/media/${id}`, { method: 'DELETE' });

// Health
export const checkHealth = () => apiFetch<{ status: string; timestamp: string }>('/health');
