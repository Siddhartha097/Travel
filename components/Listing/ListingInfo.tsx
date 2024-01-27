'use client'

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types"
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guests: number;
    rooms: number;
    bathrooms: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    location: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guests,
    rooms,
    bathrooms,
    category,
    location,
}) => {

    const { getByValue } = useCountries();
    
    const coords = getByValue(location)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Posted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 text-neutral-500 font-light">
                For: 
                <div>
                    {guests} guests
                </div>
                <div>
                    {rooms} rooms
                </div>
                <div>
                    {bathrooms} bathrooms
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-600">
                {description}
            </div>
            <hr />
            <Map center={coords} />
        </div>
    )
}

export default ListingInfo
