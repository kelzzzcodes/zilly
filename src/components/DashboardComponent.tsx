import axios from 'axios'
import { useEffect, useState } from 'react'

const DashboardComponent = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    avatar: '',
    buyer_id: '',
    phone: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const api = import.meta.env.VITE_API_URL
      try {
        const response = await axios.get(`${api}/authenticated/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        })
        const { name, email, avatar, buyer_id, phone } = response.data.data
        console.log(avatar)

        setUserDetails({ name, email, avatar, buyer_id, phone })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>User Profile</h1>
      {userDetails ? (
        <div>
          <img src={userDetails.avatar} alt={`${userDetails.name}'s avatar`} />
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default DashboardComponent
