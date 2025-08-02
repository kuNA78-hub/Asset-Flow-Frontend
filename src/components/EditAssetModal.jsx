import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateAsset } from '@/services/api';

export function EditAssetModal({ asset, onAssetUpdated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  // When the asset prop changes, update the form fields
  useEffect(() => {
    if (asset) {
      setName(asset.name);
      setDescription(asset.description);
      setType(asset.type);
      setLocation(asset.location);
      setImageUrl(asset.imageUrl || '');
    }
  }, [asset]);

  const handleSubmit = async () => {
    try {
      await updateAsset(asset.id, { name, description, type, location, imageUrl });
      setOpen(false);
      onAssetUpdated(); // Refresh the asset list
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update asset.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit: {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form fields are the same as the CreateAssetModal */}
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
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
            <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}