import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST (
    request: Request
) {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { 
        title, 
        description,
        imgSrc, 
        rooms,
        guests,
        bathrooms, 
        category,
        location, 
        price, 
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title, 
            description, 
            category,
            imgSrc,
            rooms,
            bathrooms, 
            guests,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currUser.id,
        }
    });

    return NextResponse.json(listing);
}