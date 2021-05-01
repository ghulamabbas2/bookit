import React from 'react'
import { getSession } from 'next-auth/client'

import RoomReviews from '../../components/admin/RoomReviews'
import Layout from '../../components/layout/Layout'

const RoomReviewsPage = () => {
    return (
        <Layout title='Room Reviews'>
            <RoomReviews />
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}

export default RoomReviewsPage
