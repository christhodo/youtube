export interface Message {
  message: string;
}

export interface User {
  email: string;
  password: string;
}

export interface BaseEntity {
  id: string | null;
}

export interface Project extends BaseEntity {
  name: string;
  phone: string;
  defaultImageUrl?: string;
}
