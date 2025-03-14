import React, { useState, ChangeEvent } from 'react';
import { Lawyer } from '@/types/marketplace';
import { BookingModal } from './BookingModal';
import {
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

interface LawyerGridProps {
  lawyers: Array<Lawyer>;
  isLoading: boolean;
  userRole?: 'LAWYER' | 'CLIENT' | string;
  onBookConsultation?: (bookingData: {
    lawyerId: string;
    date: Date;
    time: string;
    type: 'VIDEO' | 'PHONE' | 'IN_PERSON';
  }) => Promise<void>;
}

export const LawyerGrid = ({ 
  lawyers = [], 
  isLoading = false, 
  userRole,
  onBookConsultation 
}: LawyerGridProps) => {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const handleBooking = (lawyer: Lawyer): void => {
    setSelectedLawyer(lawyer);
    setShowBookingModal(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSpecialtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
  };

  const specialties = ['All', ...new Set(lawyers.flatMap(lawyer => lawyer.profile.specialties))];
  
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.profile.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'All' || lawyer.profile.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Find Your Legal Expert</h1>
        <p className="text-xl text-gray-600">Connect with experienced lawyers for your legal needs</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedSpecialty}
              onChange={handleSpecialtyChange}
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <AdjustmentsHorizontalIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer: Lawyer) => (
          <div
            key={lawyer.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={lawyer.profile.avatar || '/default-avatar.png'}
                alt={`${lawyer.profile.firstName} ${lawyer.profile.lastName}`}
                className="w-full h-48 object-cover"
              />
              {lawyer.rating >= 4.5 && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <StarIcon className="h-4 w-4" />
                  Top Rated
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {`${lawyer.profile.firstName} ${lawyer.profile.lastName}`}
                </h3>
                <ShieldCheckIcon className="h-6 w-6 text-blue-500" />
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-700 font-medium">
                    {lawyer.rating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-gray-500">
                    ({lawyer.reviewCount})
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm">{lawyer.profile.location}</span>
                </div>
              </div>

              <div className="mb-4">
                {lawyer.profile.specialties.map((specialty: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <BriefcaseIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">{lawyer.profile.experience} years exp.</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${lawyer.profile.hourlyRate}/hr
                </div>
              </div>

              <button
                onClick={() => handleBooking(lawyer)}
                disabled={userRole === 'LAWYER'}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  userRole === 'LAWYER'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
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
          onBook={onBookConsultation || (async () => {})}
        />
      )}
    </div>
  );
}; 