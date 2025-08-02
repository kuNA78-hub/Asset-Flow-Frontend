import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssetById, deleteAsset } from '@/services/api'; // Import deleteAsset
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingModal } from '@/components/BookingModal';
import { EditAssetModal } from '@/components/EditAssetModal'; // Import the Edit modal
import { jwtDecode } from 'jwt-decode';

export function AssetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [userRole, setUserRole] = useState(null); // State for the user's role
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAsset = async () => {
    try {
      const response = await getAssetById(id);
      setAsset(response.data);
    } catch (err) {
      setError('Failed to fetch asset details.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role); // Get the role from the token
      setLoggedInUserId(decodedToken.userId);
    }

    fetchAsset().finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this asset?')) {
      try {
        await deleteAsset(id);
        navigate('/dashboard'); // Go back to the dashboard after deleting
      } catch (err) {
        alert('Failed to delete asset.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!asset) return <div>Asset not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/dashboard')} variant="outline" className="mb-4">
        &larr; Back to Dashboard
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={asset.imageUrl || `https://placehold.co/600x400/EEE/31343C?text=${asset.name.replace(/\s/g, '+')}`} alt={asset.name} className="rounded-lg w-full" />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{asset.name}</CardTitle>
              <CardDescription>{asset.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{asset.description}</p>
              <p><strong>Location:</strong> {asset.location}</p>
              <p><strong>Status:</strong> {asset.status}</p>
              <div className="mt-6 flex space-x-2">
                {/* --- THIS IS THE CONDITIONAL LOGIC --- */}
                
                {/* If user is ADMIN, show Edit and Delete buttons */}
                {userRole === 'ROLE_ADMIN' ? (
                  <>
                    <EditAssetModal asset={asset} onAssetUpdated={fetchAsset} />
                    <Button onClick={handleDelete} variant="destructive">Delete Asset</Button>
                  </>
                ) : (
                  // Otherwise (if user is EMPLOYEE), show the Create Booking button
                  <BookingModal 
                    asset={asset} 
                    userId={loggedInUserId} 
                    onBookingCreated={fetchAsset} 
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
