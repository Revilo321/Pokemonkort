import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <svg
      onClick={handleBack}
      className='cursor-pointer h-6 w-6'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
      />
    </svg>
  )
}
