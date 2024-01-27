'use client'

import toast from "react-hot-toast";
import axios from "axios";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/types";

import ListingCard from "@/components/Listing/ListingCard";
import Heading from "@/components/Heading";
import Container from "@/components/Container";

interface ReservationClientProps {
    reservations: SafeReservation[];
    currUser?: SafeUser | any;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations=[],
    currUser
}) => {

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
                title="My Reservations"
                subtitle="Reservations on your listed properties!"
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
                        actionLabel="Cancel guest reservation"
                        currUser={currUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationClient