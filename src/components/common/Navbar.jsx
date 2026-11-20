import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function Navbar() {
  const { currentPage, navigateTo, category } = useApp();
  const menus = [
    { page: 'home', label: 'Beranda' },
    { page: 'dashboard', label: 'Dasbor' },
    { page: 'learning', label: 'Belajar' },
    { page: 'simulation', label: 'Simulasi' },
    { page: 'journey', label: 'Perjalanan Belajar' },
    { page: 'form', label: 'Data Profil' },
  ];
  return (
    <header className="navbar">
      <div className="navbar-container">
        <button type="button" className="navbar-brand" onClick={() => navigateTo('home')}>Kita<span>Invest</span></button>
        <nav className="navbar-links" aria-label="Navigasi utama">
          {menus.map((menu) => {
            const active = currentPage === menu.page || (menu.page === 'form' && ['category', 'summary'].includes(currentPage));
            return <button key={menu.page} type="button" className={`nav-link ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => navigateTo(!category && ['dashboard', 'form'].includes(menu.page) ? 'category' : menu.page)}>{menu.label}</button>;
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
