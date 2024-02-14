import { Link } from 'react-router-dom'
import { CartWrapper } from './CartComponents/CartWrapper'

export const Header = () => {
  const links = [
    {
      text: 'Home',
      path: '/',
    },
  ]
  return (
    <div className='flex justify-center'>
      <header className='bg-white body-font shadow-md mt-2 rounded-lg w-11/12 absolute top-5'>
        <div className='mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link
            to='/homepage'
            className='flex title-font font-medium items-center text-black mb-4 md:mb-0'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-10 h-10 text-white p-2 bg-blue-600 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span className='ml-3 text-xl'>Cocktail World</span>
          </Link>
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            {links.map((link, i) => (
              <Link key={i} to={link.path} className='mr-5 hover:text-gray-300'>
                {link.text}
              </Link>
            ))}
            <div className='relative'>
              <CartWrapper />
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}
