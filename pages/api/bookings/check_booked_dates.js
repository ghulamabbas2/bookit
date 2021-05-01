import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { checkBookedDatesOfRoom } from '../../../controllers/bookingControllers';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler;