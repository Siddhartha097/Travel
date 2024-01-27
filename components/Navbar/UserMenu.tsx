'use client'

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai"

import Avatar from "../Avatar"
import MenuItem from "./MenuItem";

import useRegisterModal from "@/hooks/useRegisterModal";
import useRentModal from "@/hooks/useRentModal";
import useLoginModal from "@/hooks/useLoginModal";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


interface UserMenuProps {
    currUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currUser }) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currUser) {
            return loginModal.onOpen();
        }


        //open rent modal
        rentModal.onOpen();
    }, [loginModal, currUser, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row gap-3 items-center">
                <div onClick={onRent} className="hidden md:block py-3 px-4 text-sm font-semibold rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Add your own place
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 flex flex-row items-center rounded-full cursor-pointer hover:shadow-md gap-3 transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currUser ? (
                            <>
                            <MenuItem
                                onClick={() => router.push('/')}
                                label="Home"
                            />
                            <MenuItem
                                onClick={() => router.push('/myFavorites')}
                                label="My Favorites"
                            />
                             <MenuItem
                                onClick={() => router.push('/myProperties')}
                                label="My Properties"
                            />
                            <MenuItem
                                onClick={() => router.push('/myTrips')}
                                label="My Trips"
                            />
                            <MenuItem
                                onClick={() => router.push('/myReservations')}
                                label="My Reservations"
                            />
                            <MenuItem
                                onClick={() => signOut()}
                                label="Logout"
                            />

                        </>
                        ) : (
                            <>
                            <MenuItem
                                onClick={loginModal.onOpen}
                                label="login"
                            />
                            <MenuItem
                                onClick={registerModal.onOpen}
                                label="signup"
                            />
                        </>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu