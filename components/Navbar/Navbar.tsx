import { User } from '@prisma/client'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'

interface NavbarProps {
    currUser?: User | null | any;
}

const Navbar: React.FC<NavbarProps> = ({ currUser }) => {
    
    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div className=' py-4 border-b-[1px]'>
                <Container>
                    <div className='flex flex-row justify-between items-center gap-3 md:gap-0'>
                        <Logo />
                        <Search />
                        <UserMenu currUser={currUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar