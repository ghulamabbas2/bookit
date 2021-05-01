import React from 'react'
import { getSession } from 'next-auth/client'

import Profile from '../../components/user/Profile'
import Layout from '../../components/layout/Layout'

const UpdateProfilePage = () => {
    return (
        <Layout title='Update Profile'>
            <Profile />
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }

}

export default UpdateProfilePage
