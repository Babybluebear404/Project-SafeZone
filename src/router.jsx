import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
}   from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Forget from './pages/forget'
import ChangePassword from './pages/ChangePassword'
import HomeLogin from './pages/homeLogin'
import DepressionScreening from './pages/DepressionScreening'
import Q9 from './pages/Q9'
import Q8 from './pages/Q8'
import AboutUs from './pages/AboutUs'
import Info from './pages/Info'
import Diary from './pages/Diary'
import Notification from './pages/Notification'
import Dashboard from './pages/dashboard'
import Profile from './pages/Profile'
import ErrorPage from './pages/errorpage'

const elements = createRoutesFromElements (
    <Route errorElement={<ErrorPage />}>  {/* Parent route with errorElement */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
        <Route path="/depression-screening" element={<DepressionScreening />} />
        <Route path="/HomeLogin" element={<HomeLogin />} />
        <Route path="/Q9" element={<Q9 />} />
        <Route path="/Q8" element={<Q8 />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Diary" element={<Diary />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Route>
)

const router = createBrowserRouter(elements)

export default router