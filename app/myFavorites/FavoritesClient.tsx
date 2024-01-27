'use client'

import { SafeListing, SafeUser } from "@/types";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listing/ListingCard";

interface FavoritesClientProps {
    favListings: SafeListing[];
    currUser?: SafeUser | any;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    favListings = [],
    currUser
}) => {
    return (
        <Container>
            <Heading
                title="My Favorites"
                subtitle="List of your favorite properties!"
                center
            />
            <br />
            <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favListings.map(favlisting => (
                    <ListingCard 
                        key={favlisting.id}
                        currUser={currUser}
                        data={favlisting}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavoritesClient