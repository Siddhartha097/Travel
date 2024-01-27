'use client'

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listing/ListingCard";

import { SafeReservation, SafeUser } from "@/types"
import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";


interface TripsClientProps {
    reservations: SafeReservation[];
    currUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currUser }) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/reservations/${id}`)
        .then(() => {
            toast.success('Reservation Cancelled!');
            router.refresh();
        }).catch((error) => {
            toast.error(error?.response?.data?.error);
        }).finally(() => setDeletingId(''));
    }, [router]);

    return (
        <Container>
            <Heading
                title="My Trips"
                subtitle="Your destination and you journey path!"
                center
            />
            <br />
            <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map(reservation => (
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel Reservation"
                        currUser={currUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient