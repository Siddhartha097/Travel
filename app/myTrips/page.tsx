import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import  getReservations  from "@/actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async() => {

    const currUser = await getCurrentUser();

    if (!currUser) {
        return(
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login to continue!"
            />
        );
    }

    const reservations = await getReservations({
        userId: currUser.id,
    });

    if (reservations.length === 0) {
        return (
            <EmptyState 
                title="No Trips Found"
                subtitle="Seems like you didn't have any trips reserved!"
            />
        )
    }

    return (
        <TripsClient 
            reservations={reservations}
            currUser={currUser}
        />
    )
}

export default TripsPage;