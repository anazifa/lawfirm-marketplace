import React from 'react';
import Image from 'next/image';
import { StarIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { Lawyer } from '@/types/marketplace';

interface LawyerCardProps {
  lawyer: Lawyer;
  onBookClick: (lawyerId: string) => void;
}

export const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 relative h-48">
          <Image
            src={lawyer.profile.avatar || '/default-avatar.png'}
            alt={`${lawyer.profile.firstName} ${lawyer.profile.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        {lawyer.rating >= 4.5 && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium">
            Top Rated
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {lawyer.profile.firstName} {lawyer.profile.lastName}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(lawyer.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            ({lawyer.reviewCount} reviews)
          </span>
        </div>

        <div className="mb-3">
          {lawyer.profile.specialties.map((specialty, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{lawyer.profile.location}</span>
          </div>
          <div className="text-gray-600">
            {lawyer.profile.experience} years exp.
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            ${lawyer.profile.hourlyRate}/hr
          </div>
          <button
            onClick={() => onBookClick(lawyer.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}; 