'use client'


import Container from "../Container"
import CategoryBox from "../CategoryBox"

import { MdOutlineVilla } from "react-icons/md"
import { usePathname, useSearchParams } from "next/navigation"
import { FaSkiing, FaUmbrellaBeach, FaSnowflake } from "react-icons/fa"
import { GiBarn, GiPaperWindmill, GiCampingTent, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { BsSnow } from "react-icons/bs"
import { PiSwimmingPoolFill } from "react-icons/pi";
import { LiaMountainSolid } from "react-icons/lia";
import { IoDiamond } from "react-icons/io5"
import { Suspense } from "react"

export const categories = [  
    {
        label: 'Arctic',
        icon: FaSnowflake,
        description: 'This hotel is in arctic!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This hotel is in barn!'
    },
    {
        label: 'Beach',
        icon: FaUmbrellaBeach,
        description: 'This hotel is close to the beach area!'
    },
    {
        label: 'Camping',
        icon: GiCampingTent,
        description: 'This hotel has camping activities!'
    },
    {
        label: 'Castle',
        icon: GiCastle,
        description: 'This hotel is in a castle!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This hotel is in a cave!'
    },
    {
        label: 'Countryside',
        icon: LiaMountainSolid,
        description: 'This hotel is near countryside!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This hotel is in desert!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This hotel is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This hotel is near a lake!'
    },
    {
        label: 'Luxury',
        icon: IoDiamond,
        description: 'This hotel is luxurious!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This hotel is modernized!'
    },
    {
        label: 'Pools',
        icon: PiSwimmingPoolFill,
        description: 'This hotel has pool!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This hotel has skiing activities!'
    },
    {
        label: 'Windmills',
        icon: GiPaperWindmill,
        description: 'This area has windmills!'
    },
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
                <div className="pt-4 flex flex-row items-center overflow-x-auto justify-between">
                    {categories.map(item => (
                        <CategoryBox 
                            key={item.label}
                            label={item.label}
                            selected={category === item.label}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </Container>
        </Suspense>
    )
}

export default Categories