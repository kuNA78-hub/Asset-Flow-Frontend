import { useEffect, useState } from 'react';
import { getAssets } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { CreateAssetModal } from '@/components/CreateAssetModal';
import { ScheduleView } from '@/components/ScheduleView'; // Import the new component
import { jwtDecode } from 'jwt-decode';

export function DashboardPage() {
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [userRole, setUserRole] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'schedule'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAssets = async () => {
    try {
      const response = await getAssets();
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets. Your session may have expired.');
      console.error(err);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
    fetchAssets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const filteredAssets = assets.filter(asset => 
    filter === 'ALL' || asset.type === filter
  );

  const assetTypes = ['ALL', ...new Set(assets.map(asset => asset.type))];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Asset Dashboard</h1>
        <div className="flex items-center space-x-4">
          {userRole === 'ROLE_ADMIN' && (
            <>
              <CreateAssetModal onAssetCreated={fetchAssets} />
              <Button onClick={() => navigate('/admin')}>Admin Panel</Button>
            </>
          )}
          {userRole === 'ROLE_EMPLOYEE' && (
            <Button onClick={() => navigate('/my-bookings')} variant="outline">My Bookings</Button>
          )}
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* FILTER BUTTONS */}
        <div className="flex space-x-2">
          {assetTypes.map(type => (
            <Button 
              key={type} 
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type)}
            >
              {type.replace('_', ' ')}
            </Button>
          ))}
        </div>
        
        {/* VIEW TOGGLE BUTTONS */}
        <div className="flex space-x-2">
            <Button variant={viewMode === 'card' ? 'default' : 'outline'} onClick={() => setViewMode('card')}>Card View</Button>
            <Button variant={viewMode === 'schedule' ? 'default' : 'outline'} onClick={() => setViewMode('schedule')}>Schedule View</Button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      
      {/* Conditionally render the view based on viewMode state */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <Link to={`/assets/${asset.id}`} key={asset.id}>
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <img 
                  src={asset.imageUrl || `https://placehold.co/600x400/EEE/31343C?text=${asset.name.replace(/\s/g, '+')}`} 
                  alt={asset.name}
                  className="w-full h-40 object-contain bg-gray-100"
                />
                <CardHeader>
                  <CardTitle>{asset.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Type:</strong> {asset.type}</p>
                  <p><strong>Location:</strong> {asset.location}</p>
                  <p><strong>Status:</strong> {asset.status}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <ScheduleView assets={filteredAssets} />
      )}
    </div>
  );
}
