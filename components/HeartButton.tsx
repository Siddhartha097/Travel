import useFavourite from '@/hooks/useFavourite';
import { SafeUser } from '@/types';
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  listingId: string;
  currUser: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currUser
}) => {

  const { hasFav, toggleFav } = useFavourite({ listingId, currUser });

  return (
    <div
      onClick={toggleFav}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart 
        className='fill-white absolute -top-[2px] -right-[2px]'
        size={30}
      />
      <AiFillHeart 
        size={26}
        className={hasFav ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default HeartButton
