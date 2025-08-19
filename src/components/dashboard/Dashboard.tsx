import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Vehicle, MaintenanceStatus } from '../../types';
import { VehicleCard } from './VehicleCard';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadVehicles();
    }
  }, [user]);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVehicleStatus = (vehicle: Vehicle): { status: MaintenanceStatus; message: string } => {
    // Mock logic for demonstration - in real app, this would check maintenance dates
    const statuses = [
      { status: 'overdue' as MaintenanceStatus, message: 'Troca de Óleo: Vencida' },
      { status: 'upcoming' as MaintenanceStatus, message: 'Pneus: Próxima' },
      { status: 'current' as MaintenanceStatus, message: 'Manutenções em dia' },
      { status: 'none' as MaintenanceStatus, message: 'Sem manutenções' },
    ];
    
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            Meus Veículos
          </h1>
          <p className="text-text-secondary mt-1">
            Gerencie seus veículos e manutenções
          </p>
        </div>
        <button
          onClick={() => navigate('/add-vehicle')}
          className="bg-primary text-black p-3 rounded-xl hover:bg-yellow-500 focus:ring-4 focus:ring-primary/20 transition-colors shadow-sm"
          title="Adicionar Veículo"
          aria-label="Adicionar Veículo"
        >
          <Plus size={24} />
        </button>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-16">
          <img
            src="./public/biu.png"
            alt="Nenhum veículo"
            className="w-32 h-32 mx-auto mb-6 rounded-full opacity-50"
          />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Nenhum veículo cadastrado
          </h2>
          <p className="text-text-secondary mb-6">
            Adicione seu primeiro veículo para começar
          </p>
          <button
            onClick={() => navigate('/add-vehicle')}
            className="bg-primary text-black px-6 py-3 rounded-xl hover:bg-yellow-500 font-medium transition-colors"
          >
            Adicionar Veículo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => {
            const { status, message } = getVehicleStatus(vehicle);
            return (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                status={status}
                statusMessage={message}
                onClick={() => navigate(`/vehicle/${vehicle.id}`)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};