import { useState } from 'react';
import { Lawyer } from '@/types/marketplace';
import { BookingModal } from './BookingModal';
import { StarIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/20/solid';
import { BadgeCheckIcon } from '@heroicons/react/24/solid';

interface LawyerGridProps {
  lawyers: Lawyer[];
  isLoading: boolean;
  userRole?: string;
}

export const LawyerGrid: React.FC<LawyerGridProps> = ({ lawyers, isLoading, userRole }) => {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowBookingModal(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={lawyer.profileImage || '/default-avatar.png'}
                alt={lawyer.name}
                className="w-full h-48 object-cover"
              />
              {lawyer.rating && lawyer.rating >= 4.5 && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Top Rated
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                {lawyer.isVerified && (
                  <BadgeCheckIcon className="h-6 w-6 text-blue-500" />
                )}
              </div>

              <div className="flex items-center mb-4">
                {lawyer.rating && (
                  <div className="flex items-center mr-4">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-700">
                      {lawyer.rating.toFixed(1)}
                    </span>
                    {lawyer.reviewCount && (
                      <span className="ml-1 text-gray-500">
                        ({lawyer.reviewCount})
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  {lawyer.location}
                </div>
              </div>

              <div className="mb-4">
                {lawyer.practiceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <BriefcaseIcon className="h-5 w-5 mr-1" />
                  {lawyer.experience} years exp.
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${lawyer.hourlyRate}/hr
                </div>
              </div>

              <button
                onClick={() => handleBooking(lawyer)}
                disabled={userRole === 'LAWYER'}
                className={`w-full py-2 px-4 rounded-lg ${
                  userRole === 'LAWYER'
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookingModal && selectedLawyer && (
        <BookingModal
          lawyer={selectedLawyer}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedLawyer(null);
          }}
        />
      )}
    </>
  );
}; 