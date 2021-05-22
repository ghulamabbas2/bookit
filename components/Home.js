import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Pagination from 'react-js-pagination'

import RoomItem from './room/RoomItem'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { clearErrors } from '../redux/actions/roomActions'

const Home = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } = useSelector(state => state.allRooms);

    let { location, page = 1 } = router.query;
    page = Number(page)

    useEffect(() => {
        toast.error(error)
        dispatch(clearErrors())
    }, [])

    const handlePagination = (pageNumber) => {

        if (location) {
            let url = window.location.search

            url.includes('&page') ?
                url = url.replace(/(page=)[^\&]+/, '$1' + pageNumber)
                :
                url = url.concat(`&page=${pageNumber}`)

            router.push(url)

        } else {

            router.push(`/?page=${pageNumber}`)
            // window.location.href = `/?page=${pageNumber}`
        }

    }

    let count = roomsCount;
    if (location) {
        count = filteredRoomsCount
    }

    return (
        <>
            <section id="rooms" className="container mt-5">

                <h2 className='mb-3 ml-2 stays-heading'>{location ? `Rooms in ${location}` : 'All Rooms'}</h2>

                <Link href='/search' >
                    <a className='ml-2 back-to-search'>
                        <i className='fa fa-arrow-left'></i> Back to Search
                </a>
                </Link>

                <div className="row">
                    {rooms && rooms.length === 0 ?
                        <div className="alert alert-danger mt-5 w-100"><b>No Rooms.</b></div>
                        :
                        rooms && rooms.map(room => (
                            <RoomItem key={room._id} room={room} />
                        ))
                    }
                </div>
            </section>

            {resPerPage < count &&
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        onChange={handlePagination}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            }
        </>
    )
}

export default Home
