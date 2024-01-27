import getCurrentUser from "@/actions/getCurrentUser";
import getFavorites from "@/actions/getFavorites";

import EmptyState from "@/components/EmptyState";

import React from 'react'
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async() => {

    const currUser =  await getCurrentUser();
    const favListings = await getFavorites();

    if (!currUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login to continue!"
            />
        )
    }

    if (favListings.length === 0) {
        return (
            <EmptyState 
                title="No favorites here"
                subtitle="Seems like you have no favorite properties yet!"
            />
        )
    }



    return (
        <FavoritesClient 
            favListings={favListings}
            currUser={currUser}
        />
    )
}

export default FavoritesPage