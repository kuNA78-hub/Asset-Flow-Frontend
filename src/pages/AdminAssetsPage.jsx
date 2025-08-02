import { useEffect, useState } from 'react';
import { getAssets, deleteAsset } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { EditAssetModal } from '@/components/EditAssetModal';

export function AdminAssetsPage() {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAssets = async () => {
    try {
      const response = await getAssets();
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets.');
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      try {
        await deleteAsset(assetId);
        fetchAssets(); // Refresh the list
      } catch (err) {
        alert('Failed to delete asset.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Panel: Manage Assets</h1>
        <Button onClick={() => navigate('/admin')} variant="outline">Back to User Management</Button>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell className="space-x-2">
                <EditAssetModal asset={asset} onAssetUpdated={fetchAssets} />
                <Button onClick={() => handleDelete(asset.id)} variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}