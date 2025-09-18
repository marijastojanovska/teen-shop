import { useEffect, useState } from 'react'
import api from '../api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AdminOrders(){
  const { user, token } = useSelector(s => s.auth)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  useEffect(()=>{
    if (!token || !user?.isAdmin) { nav('/'); return }
    api.get('/orders').then(res => setOrders(res.data)).finally(()=> setLoading(false))
  }, [token, user])

  async function updateStatus(id, status){
    await api.patch(`/orders/${id}/status`, { status })
    const res = await api.get('/orders')
    setOrders(res.data)
  }

  if (loading) return <div className="page">Вчитување...</div>

  return (
    <div className="page">
      <h2>Админ — Сите нарачки</h2>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Корисник</th><th>Датум</th><th>Вкупно</th><th>Статус</th><th>Промени</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.name} ({o.user?.email})</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>${o.total.toFixed(2)}</td>
              <td>{o.status}</td>
              <td>
                <select value={o.status} onChange={e=>updateStatus(o._id, e.target.value)}>
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                  <option value="shipped">shipped</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
