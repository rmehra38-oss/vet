/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Layout from './components/Layout';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './lib/ProtectedRoute';
import VetDashboard from './pages/VetDashboard';
import DietPlans from './pages/DietPlans';
import CareManagement from './pages/CareManagement';
import Marketplace from './pages/Marketplace';
import BookAppointment from './pages/BookAppointment';
import Emergency from './pages/Emergency';
import Payment from './pages/Payment';
import VideoCall from './pages/VideoCall';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToHash />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diet" element={<DietPlans />} />
            <Route path="/care" element={<CareManagement />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/call/:appointmentId" element={
              <ProtectedRoute>
                <VideoCall />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute role="owner">
                <Payment />
              </ProtectedRoute>
            } />
            
            {/* Owner Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute role="owner">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/book" element={
              <ProtectedRoute role="owner">
                <BookAppointment />
              </ProtectedRoute>
            } />
            <Route path="/animals" element={
              <ProtectedRoute role="owner">
                <Dashboard /> {/* Reusing for now or could create specialized list */}
              </ProtectedRoute>
            } />
            
            {/* Vet Routes */}
            <Route path="/vet/dashboard" element={
              <ProtectedRoute role="vet">
                <VetDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
