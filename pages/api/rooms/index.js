import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { allRooms, newRoom } from '../../../controllers/roomControllers'

import onError from '../../../middlewares/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler.get(allRooms)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .post(newRoom)

export default handler;