import './App.css'
import "@fontsource/poppins"
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ModNavigationBar } from './components/ModNavigationBar'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { ArtWallPage } from './pages/user/ArtWallPage.jsx'
import { FriendsSpacePage } from './pages/user/FriendsSpacePage.jsx'
import { LeaderboardPage } from './pages/user/LeaderboardPage.jsx'
import { LoginPage } from './pages/user/LoginPage.jsx'
import { SignUpPage } from './pages/user/SignUpPage.jsx'
import { HomePage } from './pages/user/HomePage.jsx'
import { HomePagePosted } from './pages/user/HomePagePosted.jsx'
import { ProfilePage } from './pages/user/ProfilePage.jsx'
import { ModDashboardPage } from './pages/user/ModDashboardPage.jsx'
import { ChallengesPage } from './pages/user/ChallengesPage.jsx'
import { IntroPage } from './pages/user/IntroPage.jsx'
import { NotificationPopup } from './components/NotificationPopup'
import { SignOutPopup } from './components/SignOutPopup'
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation()
  const [hasNewNotifications, setHasNewNotifications] = useState(false)
  const [showSignOutPopup, setShowSignOutPopup] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // For polling new notifications every 30 seconds
  useEffect(() => {
    const checkNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (response.ok) {
          // Look through the data to see if there is any unread notification
          const unreadExists = data.some(n => n.isRead === false);
          setHasNewNotifications(unreadExists);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    // Run immediately then every 30 seconds
    checkNotifications();
    const interval = setInterval(checkNotifications, 30000);

    return () => clearInterval(interval); // cleanup when the app closes
  }, [location.pathname]); // Recheck when the user changes pages

  return (
    <>
      {location.pathname === "/mod-dashboard" ? (
        <ModNavigationBar onSignOut={() => setShowSignOutPopup(true)} />
      ) : (
        location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/sign-up" && (
          <NavigationBar
            onSignOut={() => setShowSignOutPopup(true)}
            hasNewNotifications={hasNewNotifications}
            onNotifications={() => {
              setShowNotifications(true);
              setHasNewNotifications(false);
            }}
          />
        )
      )}

      <Routes>
        {/* <Route index element={ //TEST ONLY 
          <div className="App">
            <h1>SharedSpace</h1>
            <BorderlessButton to='/home' message={'header button'} type='header' />
            <BorderlessButton to='/home' message={'light body button'} type='lightbody' />
            <BorderlessButton to='/home' message={'dark body button'} type='darkbody' />
            <br></br>
            <BorderedButton to='/home' message={'Large Button'} size='large' />
            <br></br>
            <BorderedButton to='/home' message={'Purple Button'} size='purple' />
            <BorderedButton to='/home' message={'Pink Button'} size='pink' />
          </div>
        } /> */}

        <Route index element={<IntroPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="home-posted" element={<HomePagePosted />} />
        <Route path="art-wall" element={<ArtWallPage />} />
        <Route path="friends-space" element={<FriendsSpacePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="mod-dashboard" element={
          localStorage.getItem('token') && localStorage.getItem('userType') === 'admin' ?
            <ModDashboardPage /> :
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '24px',
              color: '#ff4d4d',
              textAlign: 'center'
            }}>
              <h1>Unauthorized Access</h1>
              <p>You don't have permission to view this page.</p>
              <p>Please <Link to="/login" style={{ color: '#007bff', textDecoration: 'underline' }}>login</Link> with the appropriate account</p>
            </div>
        } />
        <Route path="challenges" element={<ChallengesPage />} />
      </Routes>

      {showSignOutPopup && (
        <SignOutPopup
          onClose={() => setShowSignOutPopup(false)}
          onLogout={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('userType');
            setShowSignOutPopup(false);
            setShowNotifications(false);
          }} />
      )}

      {showNotifications && (<NotificationPopup onClose={() => setShowNotifications(false)} />)}

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#5E5B7C',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '12px',
            boxShadow: '0 8px 10px rgba(0, 0, 0, 0.25)',
          },
          success: {
            iconTheme: {
              primary: '#FFE2E2',
              secondary: '#5E5B7C',
            },
          },
          error: {
            iconTheme: {
              primary: '#CD6D6D',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

export default App