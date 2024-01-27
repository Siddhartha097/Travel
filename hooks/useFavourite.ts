import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/types';

import useLoginModal from './useLoginModal';

interface IUseFavourite {
    listingId: string;
    currUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currUser }: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFav = useMemo(() => {
        const list = currUser?.favIds || [];

        return list.includes(listingId);
    }, [currUser, listingId])

    const toggleFav = useCallback(async(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currUser) return loginModal.onOpen();

        try {
            let request;

            if(hasFav) {
                request = () => axios.delete(`/favourites/${listingId}`);
            } else {
                request = () => axios.post(`/favourites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    }, [currUser, hasFav, listingId, loginModal, router])

    return {
        hasFav,
        toggleFav
    }
};

export default useFavourite;