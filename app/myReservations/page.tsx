import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";    

import EmptyState from "@/components/EmptyState";
import ReservationClient from "./ReservationClient";

const ReservationPage = async() => {

  const currUser = await getCurrentUser();

  if (!currUser) {
    return (
      <EmptyState 
        title="Unauthorized"
        subtitle="Please login to continue!"
      />
    )
  }

  const reservations = await getReservations({ authorId: currUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState 
        title="No reservations found"
        subtitle="Your properties have no reservations!"
      />
    )
  }

  return (
    <ReservationClient 
      reservations={reservations}
      currUser={currUser}
    />
  )
}

export default ReservationPage