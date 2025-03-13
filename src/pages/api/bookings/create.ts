import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { lawyerId, date, time, type } = req.body;

    // Validate required fields
    if (!lawyerId || !date || !time || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get lawyer details to calculate price
    const lawyer = await prisma.user.findUnique({
      where: { id: lawyerId },
      include: { profile: true },
    });

    if (!lawyer || !lawyer.profile) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    // Calculate total price
    const baseRate = lawyer.profile.hourlyRate || 0;
    const platformFee = baseRate * 0.05;
    const totalPrice = baseRate + platformFee;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        lawyerId,
        date: new Date(date),
        time,
        type,
        price: totalPrice,
        status: 'PENDING',
      },
    });

    // TODO: Send notification emails to both lawyer and client

    return res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 