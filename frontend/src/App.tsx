import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import WizardPage from './pages/WizardPage';
import TimelinePage from './pages/TimelinePage';
import ChatPage from './pages/ChatPage';
import VotingInfoPage from './pages/VotingInfoPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME}     element={<HomePage />} />
            <Route path={ROUTES.WIZARD}   element={<WizardPage />} />
            <Route path={ROUTES.TIMELINE} element={<TimelinePage />} />
            <Route path={ROUTES.CHAT}     element={<ChatPage />} />
            <Route path={ROUTES.VOTING_INFO} element={<VotingInfoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
