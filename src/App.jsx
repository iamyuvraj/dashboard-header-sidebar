import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GPSurvey from './pages/GPSurvey';
import BlockSurvey from './pages/BlockSurvey';
import FTTHFeedback from './pages/FTTHFeedback';
import DACStatusManagement from './pages/DACStatusManagement';
import BNUDetails from './pages/BNUDetails';
import GPProfile from './pages/GPProfile';
import LoginReport from './pages/LoginReport';
import Users from './pages/Users';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/gp-survey" element={<GPSurvey />} />
                    <Route path="/block-survey" element={<BlockSurvey />} />
                    <Route path="/ftth-feedback" element={<FTTHFeedback />} />
                    <Route path="/dac-status" element={<DACStatusManagement />} />
                    <Route path="/bnu-details" element={<BNUDetails />} />
                    <Route path="/gp-profile" element={<GPProfile />} />
                    <Route path="/login-report" element={<LoginReport />} />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
