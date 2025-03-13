import { Lawyer } from '@/types/marketplace';

export interface BookingModalProps {
  lawyer: Lawyer;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps>; 