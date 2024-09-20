// frontend/src/components/DashboardHeader.tsx

import { useAuth } from '../context/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-sm font-medium text-gray-700">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
