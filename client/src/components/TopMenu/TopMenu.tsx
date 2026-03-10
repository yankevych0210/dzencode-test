import React, { useEffect } from 'react';
import { useDateTime } from '../../hooks/useDateTime';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, toggleMobileMenu, closeMobileMenu } from '../../store/slices/uiSlice';
import { RootState } from '../../store';
import { useLocation, NavLink } from 'react-router-dom';
import './TopMenu.css';

const TopMenu: React.FC = () => {
    const { date, time } = useDateTime();
    const { sessionCount } = useWebSocket();
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
    const isMobileMenuOpen = useSelector((state: RootState) => state.ui.isMobileMenuOpen);

    // Auto-close menu on path change
    useEffect(() => {
        dispatch(closeMobileMenu());
    }, [location.pathname, dispatch]);

    return (
        <header className="top-menu">
            <div className="top-menu__logo">
                <div className="top-menu__logo-icon">
                    <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <span className="top-menu__logo-text">INVENTORY</span>
            </div>

            <button
                className={`top-menu__hamburger ${isMobileMenuOpen ? 'top-menu__hamburger--open' : ''}`}
                onClick={() => dispatch(toggleMobileMenu())}
                aria-label="Toggle navigation"
            >
                <div className="top-menu__hamburger-line"></div>
                <div className="top-menu__hamburger-line"></div>
                <div className="top-menu__hamburger-line"></div>
            </button>

            <div className={`top-menu__collapsible ${isMobileMenuOpen ? 'top-menu__collapsible--open' : ''}`}>
                <nav className="top-menu__mobile-nav">
                    <NavLink to="/orders" className={({ isActive }) => `top-menu__mobile-link ${isActive ? 'top-menu__mobile-link--active' : ''}`}>{t('orders')}</NavLink>
                    <NavLink to="/groups" className={({ isActive }) => `top-menu__mobile-link ${isActive ? 'top-menu__mobile-link--active' : ''}`}>{t('groups')}</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `top-menu__mobile-link ${isActive ? 'top-menu__mobile-link--active' : ''}`}>{t('products')}</NavLink>
                    <NavLink to="/users" className={({ isActive }) => `top-menu__mobile-link ${isActive ? 'top-menu__mobile-link--active' : ''}`}>{t('users')}</NavLink>
                    <NavLink to="/settings" className={({ isActive }) => `top-menu__mobile-link ${isActive ? 'top-menu__mobile-link--active' : ''}`}>{t('settings')}</NavLink>
                </nav>

                <div className="top-menu__search">
                    <input
                        type="text"
                        className="top-menu__search-input"
                        placeholder={t('search')}
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        id="search-input"
                    />
                </div>

                <div className="top-menu__right">
                    <div className="top-menu__datetime">
                        <div className="top-menu__lang-switch">
                            <button
                                className={`top-menu__lang-btn ${i18n.language === 'en' ? 'top-menu__lang-btn--active' : ''}`}
                                onClick={() => {
                                    i18n.changeLanguage('en');
                                    localStorage.setItem('lang', 'en');
                                }}
                                title="English"
                            >
                                EN
                            </button>
                            <span className="top-menu__lang-separator">/</span>
                            <button
                                className={`top-menu__lang-btn ${i18n.language === 'uk' ? 'top-menu__lang-btn--active' : ''}`}
                                onClick={() => {
                                    i18n.changeLanguage('uk');
                                    localStorage.setItem('lang', 'uk');
                                }}
                                title="Українська"
                            >
                                UA
                            </button>
                        </div>

                        <div className="top-menu__date">{date}</div>
                        <div className="top-menu__time-row">
                            <span className="top-menu__clock-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#5fb346" strokeWidth="2" width="16" height="16">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </span>
                            <span className="top-menu__time">{time}</span>
                            <span className="top-menu__sessions-icon" title="Active sessions">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#5fb346" strokeWidth="2" width="16" height="16">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <path d="M8 21h8M12 17v4" />
                                </svg>
                            </span>
                            <span className="top-menu__sessions">{sessionCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopMenu;
