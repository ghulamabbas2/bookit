import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import RoomFeatures from './RoomFeatures'
import NewReview from '../review/NewReview'
import ListReviews from '../review/ListReviews'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { Carousel } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/roomActions'

import { checkBooking, getBookedDates } from '../../redux/actions/bookingActions'
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstants'

import getStripe from '../../utils/getStripe'
import axios from 'axios'

const RoomDetails = () => {

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter();

    const { dates } = useSelector(state => state.bookedDates);
    const { user } = useSelector(state => state.loadedUser);
    const { room, error } = useSelector(state => state.roomDetails);
    const { available, loading: bookingLoading } = useSelector(state => state.checkBooking);

    const excludedDates = []
    dates.forEach(date => {
        excludedDates.push(new Date(date))
    })


    const onChange = (dates) => {
        const [checkInDate, checkOutDate] = dates;

        setCheckInDate(checkInDate)
        setCheckOutDate(checkOutDate)

        if (checkInDate && checkOutDate) {

            // Calclate days of stay

            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)

            setDaysOfStay(days)


            dispatch(checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString()))

        }

    }

    const { id } = router.query;

    const newBookingHandler = async () => {

        const bookingData = {
            room: router.query.id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: 90,
            paymentInfo: {
                id: 'STRIPE_PAYMENT_ID',
                status: 'STRIPE_PAYMENT_STATUS'
            }
        }

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/bookings', bookingData, config)

            console.log(data);

        } catch (error) {

            console.log(error.response);

        }

    }


    const bookRoom = async (id, pricePerNight) => {

        setPaymentLoading(true);

        const amount = pricePerNight * daysOfStay;


        try {

            const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`

            const { data } = await axios.get(link, { params: { amount } })

            const stripe = await getStripe();

            // Redirect to checkout
            stripe.redirectToCheckout({ sessionId: data.id })

            setPaymentLoading(false);

        } catch (error) {

            setPaymentLoading(false);
            console.log(error);
            toast.error(error.message)
        }

    }


    useEffect(() => {

        dispatch(getBookedDates(id))

        toast.error(error)
        dispatch(clearErrors())

        return () => {
            dispatch({ type: CHECK_BOOKING_RESET })
        }

    }, [dispatch, id])


    return (
        <>
            <Head>
                <title>{room.name} - BookIT</title>
            </Head>

            <div className="container container-fluid">
                <h2 className='mt-5'>{room.name}</h2>
                <p>{room.address}</p>

                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(room.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                </div>

                <Carousel hover='pause'>
                    {room.images && room.images.map(image => (
                        <Carousel.Item key={image.public_id}>
                            <div style={{ width: '100%', height: '440px' }}>
                                <Image
                                    className='d-block m-auto'
                                    src={image.url}
                                    alt={room.name}
                                    layout='fill'
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>


                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{room.description}</p>

                        <RoomFeatures room={room} />

                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>

                            <hr />

                            <p className="mt-5 mb-3">
                                Pick Check In & Check Out Date
                            </p>

                            <DatePicker
                                className='w-100'
                                selected={checkInDate}
                                onChange={onChange}
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={new Date()}
                                excludeDates={excludedDates}
                                selectsRange
                                inline
                            />

                            {available === true &&
                                <div className="alert alert-success my-3 font-weight-bold">Room is available. Book now.</div>
                            }

                            {available === false &&
                                <div className="alert alert-danger my-3 font-weight-bold">Room not available. Try different dates.</div>
                            }

                            {available && !user &&
                                <div className="alert alert-danger my-3 font-weight-bold">Login to book room.</div>
                            }

                            {available && user &&
                                <button
                                    className="btn btn-block py-3 booking-btn"
                                    onClick={() => bookRoom(room._id, room.pricePerNight)}
                                    disabled={bookingLoading || paymentLoading ? true : false}
                                >
                                    Pay - ${daysOfStay * room.pricePerNight}
                                </button>
                            }

                        </div>
                    </div>
                </div>

                <NewReview />

                {room.reviews && room.reviews.length > 0 ?
                    <ListReviews reviews={room.reviews} />
                    :
                    <p><b>No Reviews on this room</b></p>
                }

            </div>
        </>
    )
}

export default RoomDetails
