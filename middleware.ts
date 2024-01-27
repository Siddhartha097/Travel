export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/myTrips',
        '/myReservations',
        '/myProperties',
        '/myFavorites',
    ]
}
