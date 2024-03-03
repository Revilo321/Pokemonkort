import { Link } from 'react-router-dom'
import { CartWrapper } from './CartComponents/CartWrapper'
import { AuthModal } from './Auth/AuthModal'
import { useContext, useState } from 'react'
import { AuthContext } from '../AuthProvider'

export const Header = () => {
  const { currentUser } = useContext(AuthContext)
  const [authModalOpen, setIsAuthModalOpen] = useState(false)
  const links = [
    {
      text: 'Home',
      path: '/',
    },
  ]
  return (
    <div className='flex justify-center z-[1000]'>
      <header className='bg-white body-font shadow-md mt-2 rounded-lg w-11/12 absolute top-5'>
        <div className='mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link
            to='/'
            className='flex title-font font-medium items-center text-black'>
            <img alt='logo' className='h-16 w-16' src='iconlogo.png'></img>
            <span className='ml-3 text-xl'>Cocktails</span>
          </Link>
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            {links.map((link, i) => (
              <Link key={i} to={link.path} className='mr-5 hover:text-gray-300'>
                {link.text}
              </Link>
            ))}
            <button onClick={() => setIsAuthModalOpen(true)} className='pr-5'>
              {!currentUser ? 'Login' : 'Sign out'}
            </button>
            <AuthModal
              isOpen={authModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
            />
            <div className='relative'>
              <CartWrapper />
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}
