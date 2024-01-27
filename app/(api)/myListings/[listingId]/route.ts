import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from '@/libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid Id!');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currUser.id,
        }
    });

    return NextResponse.json(listing);
}