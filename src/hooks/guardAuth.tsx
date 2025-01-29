/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lsToken } from '@/common/constants';
import { routesNames } from '@/router/routes';
import AuthService from '@/services/auth.service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const RequireAuth = ({ children }: any) => {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        await AuthService.refreshToken()
        setLoading(false)
        setIsAuthenticated(true)
      } catch (error:any) {
        setLoading(false)
        setIsAuthenticated(true)
        localStorage.removeItem(lsToken)
        navigate(routesNames.loginPage)
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return null; // Renderizar nada durante el estado de carga
  }

  return isAuthenticated ? children : null; // Render children only if authenticated
};

export default RequireAuth;
