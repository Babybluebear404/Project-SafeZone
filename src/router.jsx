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
import HomeLogin from './pages/homePage/HomeLogin'
import DepressionScreening from './pages/question/DepressionScreening'
import Q9 from './pages/question/Q9'
import Q8 from './pages/question/Q8'
import AboutUs from './pages/homePage/AboutUs'
import Info from './pages/homePage/Info'
import Diary from './pages/homePage/diary/Diary'
import Notification from './pages/homePage/Notification'
import Dashboard from './pages/homePage//dashboard/dashboard'
import Profile from './pages/homePage/Profile'
import ErrorPage from './pages/errorpage'
import Tab from './pages/Tab'

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
        <Route path="/Tab" element={<Tab />} />
    </Route>
)

const router = createBrowserRouter(elements)

export default router