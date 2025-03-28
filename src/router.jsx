import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
}   from 'react-router-dom'

import PrivateRoute from './Router/PrivateRoute'
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
import Dashboard from './pages/homePage/dashboard/dashboard'
import Profile from './pages/homePage/Profile'
import ErrorPage from './pages/errorpage'
import Tab from './pages/Tab'
import FriendShare from './pages/homePage/diary/friendShare'

const elements = createRoutesFromElements (
    <Route errorElement={<ErrorPage />}>  {/* Parent route with errorElement */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
        
        //กำหนดให้ Route ที่อยู่ในนี้ต้อง login ก่อนเสมอ
        <Route path="/depression-screening" element={<PrivateRoute element={<DepressionScreening />} />} />
        <Route path="/HomeLogin" element={<PrivateRoute element={<HomeLogin />} />} />
        <Route path="/Q9" element={<PrivateRoute element={<Q9 />} />} />
        <Route path="/Q8" element={<PrivateRoute element={<Q8 />} />} />
        <Route path="/AboutUs" element={<PrivateRoute element={<AboutUs />} />} />
        <Route path="/Info" element={<PrivateRoute element={<Info />} />} />
        <Route path="/Diary" element={<PrivateRoute element={<Diary />} />} />
        <Route path="/Notification" element={<PrivateRoute element={<Notification />} />} />
        <Route path="/Profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/Tab" element={<PrivateRoute element={<Tab />} />} />
        <Route path="/friendShare" element={<PrivateRoute element={<FriendShare />} />} />
    </Route>
)

const router = createBrowserRouter(elements)

export default router