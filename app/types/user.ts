/**
 * User types aligned with SRS Section 2 & 6:
 * users(id, name, email, password_hash, role)
 * Roles: Administrator, Cashier, Manager
 */

export type UserRole = 'admin' | 'cashier' | 'manager'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  active?: boolean
  createdAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

