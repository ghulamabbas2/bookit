import React from 'react'
import { getSession } from 'next-auth/client'

import MyBookings from '../../components/booking/MyBookings'
import Layout from '../../components/layout/Layout'

import { myBookings } from '../../redux/actions/bookingActions'
import { wrapper } from '../../redux/store'

const MyBookingsPage = () => {
    return (
        <Layout title='My Bookings'>
            <MyBookings />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))

})

export default MyBookingsPage
