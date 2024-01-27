
import type { Metadata } from 'next';
import { Inter, Nunito, Open_Sans, Poppins, Work_Sans, Rubik, Noto_Sans, Montserrat, Raleway } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar/Navbar';
import Modal from '@/components/Modal/Modal';
import RegisterModal from '@/components/Modal/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/Modal/LoginModal';
import getCurrentUser from '@/actions/getCurrentUser';
import RentModal from '@/components/Modal/RentModal';
import SearchModal from '@/components/Modal/SearchModal';

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'], weight: ['500', '600', '700']});
const worksans = Work_Sans({ subsets: ['latin'], weight: ['400','500', '600', '700']});
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500', '600', '700']});
const opensans = Open_Sans({ subsets: ['latin'], weight: ['400','500', '600', '700']});
const rubik = Rubik({ subsets: ['latin'], weight: ['400','500', '600', '700']});
const notosans = Noto_Sans({ subsets: ['latin'], weight: ['400','500', '600', '700']});
const monsterrat = Montserrat({ subsets: ['latin'], weight: ['400','500', '600', '700']});
const raleway = Raleway({ subsets: ['latin'], weight: ['400','500', '600', '700']});


export const metadata: Metadata = {
  title: 'Travel',
  description: 'Travel site for everyone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RentModal />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currUser={currUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
