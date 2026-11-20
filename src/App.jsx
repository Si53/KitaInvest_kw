import React, { useEffect } from 'react';
import { useApp } from './context/AppContext.jsx';
import { Navbar } from './components/common/Navbar.jsx';
import { Footer } from './components/common/Footer.jsx';
import { Alert } from './components/common/Alert.jsx';
import { HomePage } from './pages/onboarding/HomePage.jsx';
import { CategorySelectPage } from './pages/onboarding/CategorySelectPage.jsx';
import { ProfileFormPage } from './pages/onboarding/ProfileFormPage.jsx';
import { SummaryPage } from './pages/onboarding/SummaryPage.jsx';
import { DashboardPage } from './pages/onboarding/DashboardPage.jsx';
import { LearningPage } from './pages/learning/LearningPage.jsx';
import { JourneyPage } from './pages/journey/JourneyPage.jsx';
import { SimulationPage } from './pages/simulation/SimulationPage.jsx';

export function App() {
  const { currentPage, isStorageWarningVisible } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  return (
    <>
      <Navbar />

      <main className={`app-main ${currentPage === 'home' ? 'app-main-home' : ''}`}>
        {isStorageWarningVisible && (
          <div className="page-container">
            <Alert
              type="warning"
              message="Penyimpanan lokal (localStorage) tidak tersedia atau diblokir di peramban Anda. Aplikasi tetap dapat digunakan, namun catatan progres belajar tidak akan tersimpan setelah tab ditutup."
            />
          </div>
        )}

        <div>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'category' && <CategorySelectPage />}
          {currentPage === 'form' && <ProfileFormPage />}
          {currentPage === 'summary' && <SummaryPage />}
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'learning' && <LearningPage />}
          {currentPage === 'journey' && <JourneyPage />}
          {currentPage === 'simulation' && <SimulationPage />}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
