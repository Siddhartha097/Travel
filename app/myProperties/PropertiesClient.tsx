'use client'

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listing/ListingCard";

import { SafeListing, SafeReservation, SafeUser } from "@/types"
import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";


interface PropertiesClientProps {
    properties: SafeListing[];
    currUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ properties, currUser }) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/myListings/${id}`)
        .then(() => {
            toast.success('Property listing Deleted!');
            router.refresh();
        }).catch((error) => {
            toast.error(error?.response?.data?.error);
        }).finally(() => setDeletingId(''));
    }, [router]);

    return (
        <Container>
            <Heading
                title="My Properties"
                subtitle="List of your properties!"
                center
            />
            <br />
            <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {properties.map(property => (
                    <ListingCard 
                        key={property.id}
                        data={property}
                        actionId={property.id}
                        onAction={onCancel}
                        disabled={deletingId === property.id}
                        actionLabel="Delete"
                        currUser={currUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient;