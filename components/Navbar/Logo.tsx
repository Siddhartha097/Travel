'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

const Logo = () => {

    const router = useRouter();

    return (
        <Image 
            onClick={() => router.push('/')}
            alt="logo"
            className="hidden md:block cursor-pointer"
            height={130}
            width={120}
            src={'/images/logo2.png'}
        />
    )
}

export default Logo