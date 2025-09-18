import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import Modal from '../components/Modal'

export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addedOpen, setAddedOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setLoading(true)
    api.get(`/products/${id}`)
      .then(res => setP(res.data))
      .finally(()=> setLoading(false))
  }, [id])

  function handleAddToCart(){
    if (!p) return
    dispatch(addToCart({ product: p, qty, size, color }))
    setAddedOpen(true)
  }

  if (loading) return <div className="container"><p>Се вчитува...</p></div>
  if (!p) return <div className="container"><p>Производот не е пронајден.</p></div>

  return (
    <div className="container">
      <div className="product">
        <div className="left">
          <img src={p.image} alt={p.name} />
        </div>
        <div className="right">
          <h2>{p.name}</h2>
          <div className="price">${(p.price||0).toFixed(2)}</div>
          <p className="muted">{p.description}</p>

          {!!p.sizes?.length && (
            <div className="field" style={{marginTop:12}}>
              <div className="muted">Големина</div>
              <div className="wrap">
                {p.sizes.map(s => (
                  <button
                    key={s}
                    className="pill"
                    style={{borderColor: size===s ? 'var(--primary)' : '#222', background: size===s ? '#111' : 'transparent'}}
                    onClick={()=> setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {!!p.colors?.length && (
            <div className="field" style={{marginTop:12}}>
              <div className="muted">Боја</div>
              <div className="wrap">
                {p.colors.map(c => (
                  <button
                    key={c}
                    className="pill"
                    style={{borderColor: color===c ? 'var(--primary)' : '#222', background: color===c ? '#111' : 'transparent'}}
                    onClick={()=> setColor(c)}>{c}</button>
                ))}
              </div>
            </div>
          )}

          <div className="qty" style={{marginTop:12}}>
            <div className="muted">Количина</div>
            <input type="number" min="1" max={p.countInStock||1} value={qty} onChange={(e)=> setQty(Math.max(1, parseInt(e.target.value||1)))} />
          </div>

          <div style={{marginTop:16}}>
            <button className="btn" disabled={(p.countInStock||0)<1} onClick={handleAddToCart}>
              {(p.countInStock||0)<1? 'Нема залиха' : 'Додади во кошничка'}
            </button>
          </div>
        </div>
      </div>

      <Modal open={addedOpen} onClose={()=> setAddedOpen(false)} title="Успешно!">
        <p>Производот е додаден во кошничката.</p>
      </Modal>
    </div>
  )
}
