import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const RoomItem = ({ room }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-2">
                <Image
                    className="card-img-top mx-auto"
                    src={room.images[0].url}
                    height={170}
                    width=""
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link href={`/room/${room._id}`}>
                            <a>{room.name}</a>
                        </Link>
                    </h5>

                    <div className="ratings mt-auto mb-3">
                        <p className="card-text"><b>${room.pricePerNight}</b> / night</p>

                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{ width: `${(room.ratings / 5) * 100}%` }}
                            ></div>
                        </div>
                        <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                    </div>

                    <button className="btn btn-block view-btn">
                        <Link href={`/room/${room._id}`}>View Details</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoomItem
