import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import HomePage from './Components/HomePage'
import ProductsList from './Components/ProductsList'
import CustomerList from './Components/CustomerList'
import NotFound from './Components/NotFound'
import AddCustomer from './Components/AddCustomer'
import AddProduct from './Components/AddProduct'
import CreateOrder from "./Components/OrderForm"
import Login from './Components/LoginPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import ShoppingCart from './Components/ShoppingCart'

function App() { 
  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <>
      {user && <NavBar />}
      <Routes>
          <Route path='/' element={<Login /> } />
          <Route path='/home' element= {<HomePage/>} />
          <Route path='/customers' element={<CustomerList /> } />
          <Route path='/products' element={<ProductsList /> } />
          <Route path='/addcustomers' element={<AddCustomer />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/shopping_cart' element={<ShoppingCart />} />
          <Route path='/order' element={<CreateOrder />} />
          <Route path='*' element={<NotFound /> } />       
      </Routes>
    </>
  )
}

export default App
