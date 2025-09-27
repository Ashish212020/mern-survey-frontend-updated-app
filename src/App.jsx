import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SurveyDetailPage from './pages/SurveyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

// Portal Pages
import PortalHomePage from './pages/PortalHomePage';
import PortalLoginPage from './pages/PortalLoginPage';
import PortalStudentRegisterPage from './pages/PortalStudentRegisterPage';
import PortalAdminRegisterPage from './pages/PortalAdminRegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import CollegeAdminDashboard from './pages/CollegeAdminDashboard';
import PrivateSurveyDetailPage from './pages/PrivateSurveyDetailPage';
import PortalRoute from './components/PortalRoute';

// This is the new Layout component that includes the Navbar
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes (with Navbar) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/survey/:id" element={<SurveyDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* --- Private Portal Routes (without Navbar) --- */}
        <Route path="/portal" element={<PortalHomePage />} />
        <Route path="/portal/login" element={<PortalLoginPage />} />
        <Route path="/portal/student/register" element={<PortalStudentRegisterPage />} />
        <Route path="/portal/admin/register" element={<PortalAdminRegisterPage />} />
        
        {/* Protected Portal Routes */}
        <Route path="/portal/student/dashboard" element={<PortalRoute />}>
            <Route index element={<StudentDashboard />} />
        </Route>
        <Route path="/portal/survey/:id" element={<PortalRoute />}>
            <Route index element={<PrivateSurveyDetailPage />} />
        </Route>
        <Route path="/portal/admin/dashboard" element={<PortalRoute adminOnly={true} />}>
            <Route index element={<CollegeAdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

