import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

/* Checkbox */
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input 
                type="checkbox" 
                checked={selected} 
                onChange={(e) => onChange(e.target.checked, label)} 
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

/* Radio */
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input 
                type="radio" 
                name='sortOption' 
                checked={selected} 
                onChange={() => onChange(label)} 
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {

    const navigate = useNavigate()

    /* STATES */
    const [openFilters, setOpenFilters] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedPrice, setSelectedPrice] = useState([])
    const [sortOption, setSortOption] = useState('')

    /* FILTER DATA */
    const roomTypes = [
        "Single Bed", 
        "Double Bed",
        "Luxury Room",
        "Family Suite"
    ]

    const priceRanges = [
        '0-500',
        '500-1000',
        '1000-2000',
        '2000-3000'
    ]

    const sortOptions = [
        "Price Low to High",
        "Price High to Low"
    ]

    /* NAVIGATION */
    const handleNavigate = (id) => {
        navigate(`/rooms/${id}`)
        window.scrollTo(0, 0)
    }

    /* FILTER LOGIC */
    let filteredRooms = [...roomsDummyData]

    // Filter by room type
    if (selectedTypes.length > 0) {
        filteredRooms = filteredRooms.filter(room =>
            selectedTypes.includes(room.type)
        )
    }

    // Filter by price
    if (selectedPrice.length > 0) {
        filteredRooms = filteredRooms.filter(room => {
            return selectedPrice.some(range => {
                const [min, max] = range.split('-').map(Number)
                return room.pricePerNight >= min && room.pricePerNight <= max
            })
        })
    }

    // Sorting
    if (sortOption === "Price Low to High") {
        filteredRooms.sort((a, b) => a.pricePerNight - b.pricePerNight)
    }

    if (sortOption === "Price High to Low") {
        filteredRooms.sort((a, b) => b.pricePerNight - a.pricePerNight)
    }

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24'>

            {/* LEFT */}
            <div className='w-full'>

                {/* Heading */}
                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                        Explore our rooms with best deals and comfort.
                    </p>
                </div>

                {/* Rooms */}
                {filteredRooms.map((room) => (
                    <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300'>

                        <img
                            onClick={() => handleNavigate(room._id)}
                            src={room.images[0]}
                            alt="hotel"
                            className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
                        />

                        <div className='md:w-1/2 flex flex-col gap-2'>
                            <p className='text-gray-500'>{room.hotel.city}</p>

                            <p
                                onClick={() => handleNavigate(room._id)}
                                className='text-gray-800 text-3xl font-playfair cursor-pointer'
                            >
                                {room.hotel.name}
                            </p>

                            <div className='flex items-center'>
                                <StarRating rating={room.rating} />
                                <p className='ml-2'>200+ reviews</p>
                            </div>

                            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                <img src={assets.locationIcon} alt="location" />
                                <span>{room.hotel.address}</span>
                            </div>

                            {/* Amenities */}
                            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                {room.amenities.map((item, index) => (
                                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                                        <img src={facilityIcons[item]} alt="" className='w-5 h-5' />
                                        <p className='text-xs'>{item}</p>
                                    </div>
                                ))}
                            </div>

                            <p className='text-xl font-medium text-gray-700'>
                                ${room.pricePerNight} / night
                            </p>
                        </div>
                    </div>
                ))}

                {filteredRooms.length === 0 && (
                    <p className='text-gray-500 mt-10'>No rooms found</p>
                )}

            </div>

            {/* RIGHT FILTER */}
            <div className='bg-white w-full lg:w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16 p-4'>

                {/* Header */}
                <div className={`flex items-center justify-between mb-4 ${openFilters && "border-b"}`}>
                    <p className='text-xs font-medium'>FILTERS</p>

                    <div className='text-xs cursor-pointer'>
                        <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                            {openFilters ? 'HIDE' : 'SHOW'}
                        </span>

                        <span 
                            onClick={() => {
                                setSelectedTypes([])
                                setSelectedPrice([])
                                setSortOption('')
                            }}
                            className='hidden lg:block text-sm text-blue-500 cursor-pointer'
                        >
                            CLEAR
                        </span>
                    </div>
                </div>

                {/* Filter Body */}
                <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-500`}>

                    {/* Room Types */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Room Type</p>

                        {roomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedTypes.includes(room)}
                                onChange={(checked, value) => {
                                    setSelectedTypes(prev =>
                                        checked ? [...prev, value] : prev.filter(v => v !== value)
                                    )
                                }}
                            />
                        ))}
                    </div>

                    {/* Price */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>

                        {priceRanges.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={range}
                                selected={selectedPrice.includes(range)}
                                onChange={(checked, value) => {
                                    setSelectedPrice(prev =>
                                        checked ? [...prev, value] : prev.filter(v => v !== value)
                                    )
                                }}
                            />
                        ))}
                    </div>

                    {/* Sort */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>

                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={sortOption === option}
                                onChange={setSortOption}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllRooms