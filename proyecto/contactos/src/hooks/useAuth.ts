import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, loading, login, register, logout } = useAuthContext();

  const loginUser = async (email: string, password: string) => {
    try {
      console.log('🔐 Intentando login');
      console.log('email:', email);

      await login(email, password);

      console.log('✅ Login exitoso');
    } catch (error) {
      console.error('❌ Error en login', error);
      throw error;
    }
  };

  const registerUser = async (email: string, password: string) => {
    try {
      console.log('📝 Intentando registro');
      console.log('email:', email);

      await register(email, password);

      console.log('✅ Registro exitoso');
    } catch (error) {
      console.error('❌ Error en registro', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      console.log('🚪 Cerrando sesión');

      await logout();

      console.log('✅ Sesión cerrada');
    } catch (error) {
      console.error('❌ Error logout', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    login: loginUser,
    register: registerUser,
    logout: logoutUser
  };
};