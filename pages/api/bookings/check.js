import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { checkRoomBookingAvailability } from '../../../controllers/bookingControllers';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomBookingAvailability);

export default handler;