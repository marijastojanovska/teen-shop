import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Products from './pages/Products.jsx'
import News from './pages/News.jsx'
import LoginModal from './components/LoginModal.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import AdminOrders from './pages/AdminOrders.jsx'
import AdminProducts from './pages/AdminProducts.jsx'
import Footer from './components/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './store/authSlice.js'

function Header(){
  const { user } = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="header">
      <div className="inner container">
        <Link className="brand" to="/"><span>Tee</span>Shop Pro</Link>
        <nav className="nav">
          <NavLink to="/" end className={({isActive})=>isActive?'active':''}>Почетна</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?'active':''}>За нас</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?'active':''}>Контакт</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive?'active':''}>Производи</NavLink>
  <NavLink to="/news" className={({isActive})=>isActive?'active':''}>Новости</NavLink>
  <button className="btn ghost" onClick={()=>setLoginOpen(true)}>Најава</button>
</nav>
        <div className="grow" />
        <div className="actions">
          {user ? (
            <>
              {user.isAdmin && <Link className="btn secondary" to="/admin/orders">Админ</Link>}
              <Link className="btn secondary" to="/profile">Нарачки</Link>
              <button className="btn outline" onClick={()=>{dispatch(logout()); navigate('/')}}>Одјава</button>
            </>
          ) : (
            <>
              <Link className="btn secondary" to="/login">Најава</Link>
              <Link className="btn" to="/register">Регистрација</Link>
            </>
          )}
          <Link className="btn" to="/cart">Кошничка</Link>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
      <Route path='/products' element={<Products />} />
      <Route path='/news' element={<News />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <LoginModal open={loginOpen} onClose={()=>setLoginOpen(false)} />
      <Footer />
    </div>
  )
}