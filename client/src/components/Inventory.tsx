// src/components/Inventory.tsx

import { FaCoffee, FaDumbbell } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';

const inventoryItems = [
  { name: 'Poção de Energia (Café)', description: 'Restaura +2 de Stamina.', quantity: 3, icon: FaCoffee, color: 'text-yellow-300' },
  { name: 'Tênis de Corrida (Comum)', description: '+5% de eficiência no ganho de XP de Agilidade.', quantity: 1, icon: GiRunningShoe, color: 'text-green-300' },
  { name: 'Halteres Leves', description: 'Permite o treino de Força básico.', quantity: 1, icon: FaDumbbell, color: 'text-gray-300' }
];

export function Inventory() {
  return (
    <div className="space-y-4">
      {inventoryItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="flex items-center gap-4 p-2 bg-gray-900/50 rounded-md">
            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-black/30 ${item.color}`}>
              <IconComponent size={22} />
            </div>
            <div>
              <p className="font-bold text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
            <div className="ml-auto text-lg font-bold">x{item.quantity}</div>
          </div>
        );
      })}
    </div>
  );
}