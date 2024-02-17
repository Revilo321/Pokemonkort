import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [orders, setOrders] = useState([])
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
  })

  useEffect(() => {
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999))

    const fetchOrders = async () => {
      const q = query(
        collection(db, 'orders'),
        where('createdAt', '>=', startOfDay),
        where('createdAt', '<=', endOfDay)
      )

      const querySnapshot = await getDocs(q)
      const fetchedOrders = []
      querySnapshot.forEach((doc) => {
        fetchedOrders.push(doc.data())
      })
      setOrders(fetchedOrders)
    }

    fetchOrders()
  }, [selectedDate])

  useEffect(() => {
    const calculateSummary = () => {
      const totalOrders = orders.length
      const totalRevenue = orders.reduce((acc, order) => acc + +order.total, 0)
      const totalCost = orders.reduce(
        (acc, order) =>
          acc +
          order.items.reduce(
            (acc, item) => acc + item.priceToMake * item.quantity,
            0
          ),
        0
      )
      const totalProfit = totalRevenue - totalCost

      setSummary({
        totalOrders,
        totalRevenue,
        totalCost,
        totalProfit,
      })
    }

    if (orders.length > 0) {
      calculateSummary()
    } else {
      setSummary({
        totalOrders: 0,
        totalRevenue: 0,
        totalCost: 0,
        totalProfit: 0,
      })
    }
  }, [orders])

  const overview = [
    {
      title: 'Total Orders',
      value: summary.totalOrders,
      backgroundColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `$${summary.totalRevenue.toFixed(2)}`,
      backgroundColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Total Cost',
      value: `$${summary.totalCost.toFixed(2)}`,
      backgroundColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      title: 'Total Profit',
      value: `$${summary.totalProfit.toFixed(2)}`,
      backgroundColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
  ]

  return (
    <div className='max-w-4xl mx-auto px-4 pt-52 pb-8'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Dashboard</h1>
      <div className='mb-6'>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className='p-2 border rounded-md'
        />
      </div>
      <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-xl font-medium text-gray-700 mb-4'>
          Summary for {selectedDate.toLocaleDateString()}
        </h2>
        <div className='grid grid-cols-2 gap-4'>
          {overview.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`text-center p-4 rounded-lg shadow ${item.backgroundColor}`}
              >
                <p className={`text-sm font-semibold ${item.textColor}`}>
                  {item.title}
                </p>
                <p className='text-3xl font-bold'>{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
