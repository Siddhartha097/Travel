'use client'

import Container from '@/components/Container';
import ListingHead from '@/components/Listing/ListingHead';
import ListingInfo from '@/components/Listing/ListingInfo';
import ListingReservation from '@/components/Listing/ListingReservation';
import { categories } from '@/components/Navbar/Categories';
import useLoginModal from '@/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/types'
import { Reservation } from '@prisma/client';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'select',
}

interface ListingClientProps {
    listing: SafeListing & { user: SafeUser };
    currUser?: SafeUser | null | any;
    reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currUser, reservations = [] }) => {

    const category = useMemo(() => {
        return categories.find(item => item.label === listing.category)
    }, [listing.category])

    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })

            dates = [...dates, ...range];
        })

        return dates; 
    }, [reservations]) 

    const onCreateReservations = useCallback(() => {
        if (!currUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/reservations', {
            totalPrice, 
            startDate: dateRange.startDate, 
            endDate: dateRange.endDate,
            listingId: listing?.id,
        }).then(() => {
            toast.success('Reservation Successful!');
            setDateRange(initialDateRange);
            router.push('/myTrips');
            router.refresh();
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        });
    }, [totalPrice, dateRange, listing?.id, router, currUser, loginModal]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const daysCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

            if (daysCount && listing.price) {
                setTotalPrice(daysCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);
    

    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead
                        title={listing.title}
                        imgSrc={listing.imgSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currUser={currUser}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            bathrooms={listing.bathrooms}
                            rooms={listing.rooms}
                            guests={listing.guests}
                            description={listing.description}
                            location={listing.locationValue}
                        />
                        <div className='order-first mb-10 md:order-last md:col-span-3'>
                            <ListingReservation 
                                price={listing.price}
                                totalPrice={totalPrice}
                                dateRange={dateRange}
                                onSubmit={onCreateReservations}
                                onChangeDate={value => setDateRange(value)}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
