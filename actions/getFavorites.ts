import prisma from '@/libs/prismadb';

import getCurrentUser from './getCurrentUser';

export default async function getFavorites() {
    try {
        const currUser = await getCurrentUser();

        if (!currUser) {
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currUser.favIds || [])]
                }
            }
        });

    const safeFavorites = favorites.map(favorite => ({
        ...favorite,
        createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}