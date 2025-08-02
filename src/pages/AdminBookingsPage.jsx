import { useEffect, useState } from 'react';
import { getAssets, updateBookingStatus } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge"

export function AdminBookingsPage() {
  const [allBookings, setAllBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAllBookings = async () => {
    try {
      const response = await getAssets();
      const bookings = response.data.flatMap(asset => asset.bookings);
      setAllBookings(bookings);
    } catch (err) {
      setError('You do not have permission to view this page.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      fetchAllBookings(); // Refresh the list
    } catch (err) {
      alert('Failed to update status.');
    }
  };
  
  const getStatusVariant = (status) => {
    switch (status) {
        case 'APPROVED': return 'default';
        case 'REJECTED': return 'destructive';
        default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Panel: Manage All Bookings</h1>
        <Button onClick={() => navigate('/admin')} variant="outline">Back to User Management</Button>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.assetName}</TableCell>
              <TableCell>{booking.userName}</TableCell>
              <TableCell>{new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}</TableCell>
              <TableCell><Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge></TableCell>
              <TableCell className="space-x-2">
                {/* --- THIS IS THE MODIFIED LOGIC --- */}
                
                {/* Show the "Approve" button if the status is NOT already APPROVED */}
                {booking.status !== 'APPROVED' && (
                  <Button onClick={() => handleStatusUpdate(booking.id, 'APPROVED')} size="sm">Approve</Button>
                )}

                {/* Show the "Reject" button if the status is NOT already REJECTED */}
                {booking.status !== 'REJECTED' && (
                  <Button onClick={() => handleStatusUpdate(booking.id, 'REJECTED')} variant="destructive" size="sm">Reject</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}