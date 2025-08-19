import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Calculator, 
  FileText, 
  AlertTriangle, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobile = false }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Car, label: 'Meus Veículos', path: '/dashboard' },
    { icon: Calculator, label: 'Calculadora', path: '/calculator' },
    { icon: FileText, label: 'Relatórios', path: '/reports' },
    { icon: AlertTriangle, label: 'Alertas', path: '/alerts' },
    { icon: User, label: 'Meu Perfil', path: '/profile' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-text-primary'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-xs mt-1 truncate">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <img
            src="https://placehold.co/40x40/FFCB05/000000?text=LM"
            alt="LifeMotor"
            className="w-10 h-10 rounded-lg"
          />
          <h1 className="text-xl font-bold text-text-primary">LifeMotor</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary text-black font-medium'
                    : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};