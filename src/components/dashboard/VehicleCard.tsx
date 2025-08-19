import React from 'react';
import { Vehicle, MaintenanceStatus } from '../../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  status: MaintenanceStatus;
  statusMessage: string;
  onClick: () => void;
}

const getStatusChipColor = (status: MaintenanceStatus) => {
  switch (status) {
    case 'overdue':
      return 'bg-red-500 text-white';
    case 'upcoming':
      return 'bg-orange-500 text-white';
    case 'current':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

const getCategoryIcon = (category: Vehicle['category']) => {
  const icons = {
    'Automóvel': 'https://placehold.co/100x100/FFFFFF/000000?text=Carro',
    'Motocicleta': 'https://placehold.co/100x100/FFFFFF/000000?text=Moto',
    'Bike': 'https://placehold.co/100x100/FFFFFF/000000?text=Bike',
    'Embarcação': 'https://placehold.co/100x100/FFFFFF/000000?text=Barco',
    'Avião': 'https://placehold.co/100x100/FFFFFF/000000?text=Avião',
  };
  return icons[category];
};

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  status,
  statusMessage,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group"
    >
      <div className="relative">
        <img
          src={vehicle.image_url || getCategoryIcon(vehicle.category)}
          alt={vehicle.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusChipColor(status)}`}>
            {statusMessage}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-text-primary text-lg mb-1">
          {vehicle.name}
        </h3>
        <p className="text-text-secondary text-sm mb-2">
          {vehicle.manufacturer} {vehicle.model}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">
            {vehicle.plate}
          </span>
          <span className="text-primary font-medium text-sm">
            {vehicle.current_mileage.toLocaleString()} {vehicle.mileage_unit}
          </span>
        </div>
      </div>
    </div>
  );
};