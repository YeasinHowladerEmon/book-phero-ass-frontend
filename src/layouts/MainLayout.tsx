
import Navber from './Navber'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Navber />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  )
}

