import useCountries from '@/hooks/useCountries';
import { SafeUser } from '@/types';
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imgSrc: string;
    id: string;
    currUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imgSrc,
    id,
    currUser,
}) => {

    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image
                    src={imgSrc}
                    alt='Image'
                    className='object-cover w-full'
                    fill
                />
                <div className='absolute top-5 right-5'>
                    <HeartButton 
                        listingId={id}
                        currUser={currUser}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead
