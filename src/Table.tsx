/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react'
import { authenticationContext } from './AuthenticationContext'
import { useNavigate } from 'react-router';

function App() {
  const [data, setData] = useState([])
  const auth = useContext(authenticationContext);
  const navigate = useNavigate();
  console.log(auth.token)
  useEffect(() => {
    fetch('/api/magasin', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    })
    .then(res => {if (res.status === 200) return res.json()
    return navigate('/login')})
    .then(data => setData(data))
  
  }, [])
  return (
    <>
      <table>
        {data.map((item: any) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
          </tr>
        ))}
        
      </table>
    </>
  )
}

export default App
