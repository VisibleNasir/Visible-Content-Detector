import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import History from './components/History/History'
import Contact from './components/Contact/contact'


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detect" element={<Homepage />} />
        <Route path="/history" element={<History/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
