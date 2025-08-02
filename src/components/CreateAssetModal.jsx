import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAsset } from '@/services/api';

export function CreateAssetModal({ onAssetCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for the image URL
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const clearForm = () => {
    setName('');
    setDescription('');
    setType('');
    setLocation('');
    setImageUrl('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!name || !type || !location) {
      setError('Please fill out name, type, and location.');
      return;
    }

    try {
      await createAsset({ name, description, type, location, imageUrl });
      clearForm();
      setOpen(false);
      onAssetCreated(); // Refresh the asset list on the dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create asset.');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Asset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Asset</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEETING_ROOM">Meeting Room</SelectItem>
                <SelectItem value="VEHICLE">Vehicle</SelectItem>
                <SelectItem value="PROJECTOR">Projector</SelectItem>
                <SelectItem value="LAPTOP">Laptop</SelectItem>
                <SelectItem value="OTHER_EQUIPMENT">Other Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
          </div>
          {/* ADDED IMAGE URL FIELD */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
            <Input id="imageUrl" placeholder="http://example.com/photo.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Asset</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}