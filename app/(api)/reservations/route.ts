import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from '@/libs/prismadb';

export async function POST ( request: Request ) {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId, 
        startDate,
        endDate,
        totalPrice,
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}