export const dynamic = 'force-dynamic'

import getCurrentUser from '@/actions/getCurrentUser';
import getListings, { IListingsParams } from '@/actions/getListing';

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/Listing/ListingCard';

interface HomeProps {
  searchParams: IListingsParams;
} 

const Home = async({ searchParams }: HomeProps) => {

  const listings = await getListings(searchParams);
  const currUser = await getCurrentUser();

  if (listings.length === 0) {
    return(
      <EmptyState showReset />
    )
  }

  // throw new Error('something went wrong')

  return (
    <Container>
      <div 
        className='
          pt-24
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          '>
            {listings.map((listing) => {
              return (
                <ListingCard 
                  currUser={currUser}
                  key={listing.id}
                  data={listing}
                />
              )
            })}
          </div>
    </Container>
  )
}

export default Home;
