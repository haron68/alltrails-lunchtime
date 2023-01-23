import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Theme from './assets/flowbite-theme'
import AppLayout from './components/layouts/AppLayout'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound'

import { Flowbite } from 'flowbite-react'

function App() {
  return (
    <Flowbite theme={{ theme: Theme }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Flowbite>
  )
}

export default App
