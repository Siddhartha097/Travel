import prisma from '@/libs/prismadb';

export interface IListingsParams {
    userId?: string;
    guests?: number;
    rooms?: number;
    bathrooms?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(
    params: IListingsParams,
) {
    try {

        const { 
            userId,
            guests,
            rooms,
            bathrooms,
            startDate,
            endDate,
            locationValue,
            category
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (rooms) {
            query.rooms = {
                gte: +rooms
            };
        }

        if (guests) {
            query.guests = {
                gte: +guests
            };
        }

        if (bathrooms) {
            query.bathrooms = {
                gte: +bathrooms
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate},
                                startDate: { lte: endDate},
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map(listing => ({...listing, createdAt: listing.createdAt.toISOString(),}))

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}