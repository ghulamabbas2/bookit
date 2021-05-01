import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Search = () => {

    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState('');
    const [category, setCategory] = useState('');

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (location.trim()) {
            router.push(`/?location=${location}&guests=${guests}&category=${category}`)
        } else {
            router.push('/')
        }
    }


    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h2 className="mb-3">Search Rooms</h2>
                        <div className="form-group">
                            <label htmlFor="location_field">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location_field"
                                placeholder="new york"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="guest_field">No. of Guests</label>
                            <select
                                className="form-control"
                                id="guest_field"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="room_type_field">Room Type</label>
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

                        <button type="submit" className="btn btn-block py-2">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search
