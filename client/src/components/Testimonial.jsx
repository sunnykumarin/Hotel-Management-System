import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
            
            <Title 
                title='What Our Guests Say' 
                subTitle='Discover why discerning travelers consistently choose Roomora for their exclusive and luxurious accommodations around the world.' 
            />

            <div className="flex flex-wrap items-center gap-6 mt-20">
                {testimonials.map((testimonial) => (
                    
                    <div 
                        key={testimonial.id} 
                        className='bg-white p-6 rounded-xl shadow max-w-sm'
                    >
                        {/* User Info */}
                        <div className='flex items-center gap-3'>
                            <img 
                                className='w-12 h-12 rounded-full' 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                            />
                            <div>
                                <p className='font-playfair text-xl'>{testimonial.name}</p>
                                <p className='text-gray-500 text-sm'>{testimonial.address}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className='flex items-center gap-1 mt-4'>
                            <StarRating rating={testimonial.rating} />
                        </div>

                        {/* Review */}
                        <p className='text-gray-500 mt-4'>
                            {testimonial.review}
                        </p>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default Testimonial