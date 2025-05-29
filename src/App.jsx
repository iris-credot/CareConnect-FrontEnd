import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/logIn';
import SignUp from './pages/signup';
import VerifyEmail from './pages/verifyOtp';
import ResetPassword from './pages/resetPassword';
import ForgotPassword from './pages/forgotPassword';
import CreateDoctor from './pages/createDoctor';
import LayoutDoctor from './layout/layoutDoctor';
import LayoutAdmin from './layout/layoutAdmin';
import NotFound from './pages/notFound';
import Loading from './pages/loadingPage';
import CreateAppointment from './pages/AddAppointmentPage';
import AddFood from './pages/addFoodsPage';
import AddSport from './pages/addSportsPage';
import AdminDashboard from './pages/adminDasboard';
import AppointmentsAdmin from './pages/appointmentsAdmin';
import AppointmentsDoctor from './pages/appointmentsDoctor';
import DoctorDashboard from './pages/doctorDashbors';
import DoctorsPage from './pages/doctorInfo';
import FoodsSports from './pages/foodsSports';
import NotificationsPage from './pages/notifications';
import PatientsPage from './pages/patientsInfo';
import ReportsDoctor from './pages/reportDoctor';
import ReportsAdmin from './pages/reportAdmin';
import SettingsPage from './pages/settings';
import PatientsDetails from './pages/patientView';
import UpdatePassword from './pages/updatepass';
import Home from './pages/home';  
import PatientsAll from './pages/allPatients';
import DoctorsDetails from './pages/docview';
import ViewAppointment from './pages/appoiview';
    
function App() {


  return (
    <Routes>
    {/* Public routes */}
   <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/createdoc" element={<CreateDoctor />} />
    <Route path="/verify" element={<VerifyEmail />} />
    <Route path="/forgotpass" element={<ForgotPassword />} />
    <Route path="/resetpass" element={<ResetPassword />} />
    <Route path="/loading" element={<Loading />} />
    <Route path="*" element={<NotFound />} />

    {/* Protected / Doctor Layout Routes */}
    <Route path="/doctor" element={<LayoutDoctor />}>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="appointments" element={<AppointmentsDoctor />} />
      <Route path="appointments/create-appointment" element={<CreateAppointment />} />
      <Route path="sportNutri" element={<FoodsSports />} />
      <Route path="sportNutri/add-Food" element={<AddFood />} />
      <Route path="sportNutri/add-Sport" element={<AddSport />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="patients/:id" element={<PatientsPage />} />
      <Route path="patients/view" element={<PatientsDetails />} />
      <Route path="reports" element={<ReportsDoctor/>} />
      <Route path="settings" element={<SettingsPage />}/>
      <Route path="settings/update-pass" element={<UpdatePassword />} />
    </Route>

     {/* Protected / Admin Layout Routes */}
     <Route path="/admin" element={<LayoutAdmin />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="appointments" element={<AppointmentsAdmin />} />
      <Route path="appointments/view/:id" element={<ViewAppointment />} />
       <Route path="appointments/create" element={<CreateAppointment />} />
      <Route path="doctors" element={<DoctorsPage />} />
        <Route path="doctors/view/:id" element={<DoctorsDetails />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="patients" element={<PatientsAll />} />
      <Route path="patients/view/:id" element={<PatientsDetails />} />
      <Route path="reports" element={<ReportsAdmin />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="settings/update-pass" element={<UpdatePassword />} />
    </Route>
  </Routes>
  )
}

export default App
