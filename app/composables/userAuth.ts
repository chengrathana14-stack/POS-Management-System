import type { User, UserRole } from '~/types/user'

const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'Rathana',
    email: 'rathana@pos.local',
    role: 'cashier',
    active: true,
    createdAt: '2026-11-01'
  },
  {
    id: 2,
    name: 'Dara',
    email: 'dara@pos.local',
    role: 'cashier',
    active: true,
    createdAt: '2026-11-01'
  },
  {
    id: 3,
    name: 'Sarah Connor (Admin)',
    email: 'admin@pos.local',
    role: 'admin',
    active: true,
    createdAt: '2026-11-01'
  },
  {
    id: 4,
    name: 'Alex Stone (Manager)',
    email: 'manager@pos.local',
    role: 'manager',
    active: true,
    createdAt: '2026-11-01'
  }
]

export function userAuth() {
  const currentUser = useState<User | null>('auth_user', () => INITIAL_USERS[0])
  const allUsers = useState<User[]>('all_users', () => INITIAL_USERS)

  const isAuthenticated = computed(() => currentUser.value !== null)
  const userRole = computed(() => currentUser.value?.role || null)

  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isManager = computed(() => currentUser.value?.role === 'manager')
  const isCashier = computed(() => currentUser.value?.role === 'cashier')

  const switchRole = (role: UserRole) => {
    const target = allUsers.value.find((u) => u.role === role)
    if (target) {
      currentUser.value = target
    }
  }

  const login = (email: string) => {
    const user = allUsers.value.find((u) => u.email.toLowerCase() === email.toLowerCase() || u.name.toLowerCase() === email.toLowerCase())
    if (user) {
      currentUser.value = user
      return { success: true }
    }
    currentUser.value = INITIAL_USERS[0]
    return { success: true }
  }

  const logout = () => {
    currentUser.value = null
    navigateTo('/login')
  }

  return {
    currentUser,
    allUsers,
    isAuthenticated,
    userRole,
    isAdmin,
    isManager,
    isCashier,
    switchRole,
    login,
    logout
  }
}
