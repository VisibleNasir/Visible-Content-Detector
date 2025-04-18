import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import Songs from './components/Songs/Songs'
import { Contact } from 'lucide-react'


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detect" element={<Homepage />} />
        <Route path="/songs" element={<Songs/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
