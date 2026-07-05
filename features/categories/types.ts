export interface Category {
  id: number;
  user_id: number;
  name: string;
  icon: string | null;
  color: string | null;
  created_at: string;
}

export interface CreateCategoryInput {
  name: string;
  icon?: string;
  color: string;
}

export interface UpdateCategoryInput {
  name: string;
  icon?: string;
  color?: string;
}
