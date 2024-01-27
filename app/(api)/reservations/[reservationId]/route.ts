import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from '@/libs/prismadb';

interface IParams {
    reservationId?: string;
}

export async function DELETE ( request: Request, { params }: { params: IParams } ) {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if ( !reservationId || typeof reservationId !== "string" ) {
        throw new Error('Invalid user');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currUser.id },
                { listing: { userId: currUser.id }}
            ]
        }
    });

    return NextResponse.json(reservation);
}