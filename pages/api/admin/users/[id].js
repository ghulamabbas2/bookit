import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'

import { getUserDetails, updateUser, deleteUser } from '../../../../controllers/authControllers'

import onError from '../../../../middlewares/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getUserDetails)


handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .put(updateUser)


handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteUser)

export default handler;