import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { Lawyer } from '@/types/marketplace';
import "react-datepicker/dist/react-datepicker.css";

interface BookingModalProps {
  lawyer: Lawyer;
  onClose: () => void;
  onBook: (bookingData: BookingData) => Promise<void>;
}

interface BookingData {
  lawyerId: string;
  date: Date;
  time: string;
  type: 'VIDEO' | 'PHONE' | 'IN_PERSON';
}

const CONSULTATION_TYPES = [
  { id: 'VIDEO', label: 'Video Call' },
  { id: 'PHONE', label: 'Phone Call' },
  { id: 'IN_PERSON', label: 'In Person' },
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  lawyer,
  onClose,
  onBook,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'VIDEO' | 'PHONE' | 'IN_PERSON'>('VIDEO');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsLoading(true);
    try {
      await onBook({
        lawyerId: lawyer.id,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
      });
      onClose();
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    const baseRate = lawyer.profile.hourlyRate || 0;
    const platformFee = baseRate * 0.05; // 5% platform fee
    return {
      baseRate,
      platformFee,
      total: baseRate + platformFee,
    };
  };

  const { baseRate, platformFee, total } = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          Book Consultation with {lawyer.profile.firstName} {lawyer.profile.lastName}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
            />
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CONSULTATION_TYPES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setConsultationType(id as typeof consultationType)}
                  className={`p-2 rounded ${
                    consultationType === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Consultation Fee</span>
                <span>${baseRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (5%)</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={!selectedDate || !selectedTime || isLoading}
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 