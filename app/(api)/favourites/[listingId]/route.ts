import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from '@/libs/prismadb';   

interface IParams {
    listingId?: string;
}

export async function POST (
    request: Request,
    { params }: { params: IParams }
){
    const currUser = await getCurrentUser();

    if (!currUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid Id');
    }

    let favIds = [...(currUser.favIds || [])];

    favIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currUser.id,
        },
        data: {
            favIds
        }
    });

    return NextResponse.json(user);
}

export async  function DELETE (
    request: Request,
    { params }: {params: IParams}
){
    const currUser = await getCurrentUser();

    if (!currUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid Id');
    }

    let favIds = [...(currUser.favIds || [])];

    favIds = favIds.filter((id) => id != listingId);

    const user = await prisma.user.update({
        where: {
            id: currUser.id,
        },
        data: {
            favIds
        }
    });

    return NextResponse.json(user);
}