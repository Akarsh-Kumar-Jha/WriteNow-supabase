import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Note from './Pages/Note'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { Toaster, toast } from 'sonner'

function App() {
  return (
<div>
   <Toaster />
      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/note/:id' element={<Note/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/login' element={<Login/>} />
    </Routes>
</div>
  )
}

export default App