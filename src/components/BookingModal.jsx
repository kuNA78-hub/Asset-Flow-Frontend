import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createBooking } from '@/services/api';

// The modal now accepts the specific asset and the logged-in user's ID
export function BookingModal({ asset, userId, onBookingCreated }) {
  const [purpose, setPurpose] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!startTime || !endTime || !userId) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      await createBooking({
        assetId: asset.id,
        userId: userId, // Use the real userId passed in as a prop
        startTime,
        endTime,
        purpose,
      });
      setOpen(false);
      onBookingCreated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking.');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Booking</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book: {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* We don't need the asset selector anymore */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">Start Time</Label>
            <Input
              id="startTime"
              type="text"
              placeholder="YYYY-MM-DDTHH:MM:SS"
              className="col-span-3"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">End Time</Label>
            <Input
              id="endTime"
              type="text"
              placeholder="YYYY-MM-DDTHH:MM:SS"
              className="col-span-3"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="purpose" className="text-right">Purpose</Label>
            <Input
              id="purpose"
              className="col-span-3"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}