import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { updateRoom, getRoomDetails, clearErrors } from '../../redux/actions/roomActions'
import { UPDATE_ROOM_RESET } from '../../redux/constants/roomConstants'

const UpdateRoom = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [category, setCategory] = useState('King')
    const [guestCapacity, setGuestCapacity] = useState(1)
    const [numOfBeds, setNumOfBeds] = useState(1)
    const [internet, setInternet] = useState(false)
    const [breakfast, setBreakfast] = useState(false)
    const [airConditioned, setAirConditioned] = useState(false)
    const [petsAllowed, setPetsAllowed] = useState(false)
    const [roomCleaning, setRoomCleaning] = useState(false)

    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, isUpdated } = useSelector(state => state.room)
    const { loading: roomDetailsLoading, error: roomDetailsError, room } = useSelector(state => state.roomDetails)

    const { id } = router.query

    useEffect(() => {

        if (room && room._id !== id) {
            dispatch(getRoomDetails('', id))
        } else {
            setName(room.name)
            setPrice(room.pricePerNight)
            setDescription(room.description)
            setAddress(room.address)
            setCategory(room.category)
            setGuestCapacity(room.guestCapacity)
            setNumOfBeds(room.numOfBeds)
            setInternet(room.internet)
            setBreakfast(room.breakfast)
            setAirConditioned(room.airConditioned)
            setPetsAllowed(room.petsAllowed)
            setRoomCleaning(room.roomCleaning)
            setOldImages(room.images)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (roomDetailsError) {
            toast.roomDetailsError(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            dispatch(getRoomDetails('', id))
            router.push('/admin/rooms')
            dispatch({ type: UPDATE_ROOM_RESET })
        }

    }, [dispatch, error, roomDetailsError, isUpdated, room, id])

    const submitHandler = (e) => {
        e.preventDefault()

        const roomData = {
            name,
            pricePerNight: price,
            description,
            address,
            category,
            guestCapacity: Number(guestCapacity),
            numOfBeds: Number(numOfBeds),
            internet,
            breakfast,
            airConditioned,
            petsAllowed,
            roomCleaning,
        }

        if (images.length !== 0) roomData.images = images

        dispatch(updateRoom(room._id, roomData))

    }


    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImages([]);
        setOldImages([]);
        setImagesPreview([]);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }

            reader.readAsDataURL(file)

        })

    }


    return (
        <>
            {roomDetailsLoading ? <Loader /> :
                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-8">
                            <form className="shadow-lg" onSubmit={submitHandler} enctype="multipart/form-data">
                                <h1 className="mb-4">Update Room</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address_field">Address</label>
                                    <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select
                                        className="form-control"
                                        id="room_type_field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {['King', 'Single', 'Twins'].map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Guest Capacity</label>
                                    <select
                                        className="form-control"
                                        id="guest_field"
                                        value={guestCapacity}
                                        onChange={(e) => setGuestCapacity(e.target.value)}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="category_field">Number of Beds</label>
                                    <select
                                        className="form-control"
                                        id="numofbeds_field"
                                        value={numOfBeds}
                                        onChange={(e) => setNumOfBeds(e.target.value)}
                                    >
                                        {[1, 2, 3].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>


                                <label className="mb-3">Room Features</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="internet_checkbox"
                                        value={internet}
                                        onChange={(e) => setInternet(e.target.checked)}
                                        checked={internet}
                                    />
                                    <label className="form-check-label" htmlFor="internet_checkbox">
                                        Internet
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="breakfast_checkbox"
                                        value={breakfast}
                                        onChange={(e) => setBreakfast(e.target.checked)}
                                        checked={breakfast}
                                    />
                                    <label className="form-check-label" htmlFor="breakfast_checkbox">
                                        Breakfast
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="airConditioned_checkbox"
                                        value={airConditioned}
                                        onChange={(e) => setAirConditioned(e.target.checked)}
                                        checked={airConditioned}
                                    />
                                    <label className="form-check-label" htmlFor="airConditioned_checkbox">
                                        Air Conditioned
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="petsAllowed_checkbox"
                                        value={petsAllowed}
                                        onChange={(e) => setPetsAllowed(e.target.checked)}
                                        checked={petsAllowed}
                                    />
                                    <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                                        Pets Allowed
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="roomCleaning_checkbox"
                                        value={roomCleaning}
                                        onChange={(e) => setRoomCleaning(e.target.checked)}
                                        checked={roomCleaning}
                                    />
                                    <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                                        Room Cleaning
                                    </label>
                                </div>


                                <div className="form-group mt-4">
                                    <label>Images</label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="room_images"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose Images
                                        </label>
                                    </div>

                                    {imagesPreview.map(img => (

                                        <img
                                            src={img}
                                            key={img}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />

                                    ))}

                                    {oldImages && oldImages.map(img => (

                                        <img
                                            src={img.url}
                                            key={img.public_id}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />

                                    ))}

                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block new-room-btn py-3"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <ButtonLoader /> : 'UPDATE'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default UpdateRoom
