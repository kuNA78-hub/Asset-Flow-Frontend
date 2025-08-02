import { useEffect, useState } from 'react';
import { getBookingsForUser } from '@/services/api';
import { jwtDecode } from 'jwt-decode';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Import the Badge component
import { useNavigate } from 'react-router-dom';

// Helper function to determine badge color based on status
const getStatusVariant = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'default'; // Greenish color in Shadcn
    case 'REJECTED':
      return 'destructive'; // Red color
    case 'PENDING':
    default:
      return 'secondary'; // Gray color
  }
};

export function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          
          if (userId) {
            const response = await getBookingsForUser(userId);
            setBookings(response.data);
          } else {
            setError('Could not identify user from token.');
          }
        }
      } catch (err) {
        setError('Failed to fetch your bookings.');
        console.error(err);
      }
    };
    fetchMyBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button onClick={() => navigate('/dashboard')} variant="outline">Back to Dashboard</Button>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Status</TableHead> {/* ADDED STATUS HEADER */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.assetName}</TableCell>
              <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
              <TableCell>{booking.purpose}</TableCell>
              {/* ADDED STATUS CELL WITH A BADGE */}
              <TableCell>
                <Badge variant={getStatusVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}