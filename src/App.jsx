import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboard from "./pages/Dashboard"
import DataEntry from "./pages/DataEntry"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/entries" element={<DataEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
