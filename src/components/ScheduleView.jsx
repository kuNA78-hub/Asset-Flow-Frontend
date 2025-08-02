import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Helper function to convert a time string to a percentage for CSS positioning
// Assumes a workday from 8 AM (0%) to 6 PM (100%)
const timeToPercentage = (timeStr) => {
  const date = new Date(timeStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const totalMinutes = (hours - 8) * 60 + minutes;
  const workdayMinutes = 10 * 60; // 10 hours from 8 AM to 6 PM

  return Math.max(0, Math.min(100, (totalMinutes / workdayMinutes) * 100));
};

export function ScheduleView({ assets }) {
  // Filter for bookings that are approved
  const getApprovedBookings = (bookings) => {
    return bookings ? bookings.filter(b => b.status === 'APPROVED') : [];
  };

  return (
    <Card className="p-4">
      {/* Timeline Header */}
      <div className="flex mb-2">
        <div className="w-1/5 pr-2"></div> {/* Asset name column */}
        <div className="w-4/5 flex justify-between text-xs text-muted-foreground">
          <span>8 AM</span>
          <span>10 AM</span>
          <span>12 PM</span>
          <span>2 PM</span>
          <span>4 PM</span>
          <span>6 PM</span>
        </div>
      </div>

      <div className="space-y-2">
        {assets.map(asset => (
          <div key={asset.id} className="flex items-center">
            {/* Asset Name */}
            <div className="w-1/5 pr-2 font-semibold truncate">{asset.name}</div>
            
            {/* Timeline Bar */}
            <div className="w-4/5 h-10 bg-gray-200 rounded-md relative">
              {getApprovedBookings(asset.bookings).map(booking => {
                const left = timeToPercentage(booking.startTime);
                const right = timeToPercentage(booking.endTime);
                const width = right - left;

                return (
                  <div
                    key={booking.id}
                    className="absolute h-full bg-blue-500 rounded-md p-1 text-white text-xs overflow-hidden"
                    style={{ left: `${left}%`, width: `${width}%` }}
                    title={`${booking.userName}: ${booking.purpose}`}
                  >
                    <span className="truncate block">{booking.userName} - {booking.purpose}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}