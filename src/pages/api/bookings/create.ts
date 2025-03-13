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

    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { lawyerId, date, time, description } = req.body;

    if (!lawyerId || !date || !time || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const lawyer = await prisma.lawyer.findUnique({
      where: { id: lawyerId },
      select: { hourlyRate: true }
    });

    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    const totalPrice = lawyer.hourlyRate;

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        lawyerId,
        date: new Date(date),
        time,
        description,
        totalPrice,
        status: 'PENDING'
      }
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 