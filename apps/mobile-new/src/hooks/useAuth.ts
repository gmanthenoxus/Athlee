import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout, setUser } =
    useAuthStore();

  const isPlayer = () => user?.role === 'Player';
  const isBusiness = () => user?.role === 'Business';
  const isVisitor = () => user?.role === 'Visitor';

  return {
    user,
    isAuthenticated,
    isLoading,
    isPlayer,
    isBusiness,
    isVisitor,
    login,
    register,
    logout,
    setUser,
  };
}
