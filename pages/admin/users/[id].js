import React from 'react'
import { getSession } from 'next-auth/client'

import UpdateUser from '../../../components/admin/UpdateUser'
import Layout from '../../../components/layout/Layout'

const UpdateUserPage = () => {
    return (
        <Layout title='Update User'>
            <UpdateUser />
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

export default UpdateUserPage
