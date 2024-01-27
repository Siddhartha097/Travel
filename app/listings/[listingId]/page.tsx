import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById'
import EmptyState from '@/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservations';

interface IParams {
    listingId?: string;
}

const Listings = async({ params }: { params: IParams }) => {
    
    const listings = await getListingById(params);
    const reservations = await getReservations(params);
    const currUser = await getCurrentUser();

    if (!listings) {
        return (
            <EmptyState />
        )
    }

    return (
        <div>
            <ListingClient 
                reservations={reservations}
                listing={listings}
                currUser={currUser}
            />
        </div>
    )
}

export default Listings
