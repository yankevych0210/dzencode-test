import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { storage } from '../../utils/storage';
import './NavSidebar.css';

const NavSidebar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedAvatar = storage.get<string | null>('userAvatar', null);
        if (storedAvatar) {
            setAvatar(storedAvatar);
        }
    }, []);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setAvatar(base64String);
                storage.set('userAvatar', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <aside className="nav-sidebar" role="navigation" aria-label="Main navigation">
            <div className="nav-sidebar__avatar-wrap" onClick={handleAvatarClick} title="Изменить аватарку">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <div className="nav-sidebar__avatar">
                    {avatar ? (
                        <img src={avatar} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <svg viewBox="0 0 40 40" width="48" height="48" aria-hidden="true">
                            <circle cx="20" cy="16" r="9" fill="#ccc" />
                            <ellipse cx="20" cy="38" rx="16" ry="12" fill="#ccc" />
                        </svg>
                    )}
                </div>
                <div className="nav-sidebar__settings-icon" aria-label="Upload Avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5fb346" strokeWidth="3" width="14" height="14">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </div>

            <nav className="nav-sidebar__nav" aria-label="Page navigation">
                <NavLink
                    to="/orders"
                    id="nav-link-orders"
                    className={({ isActive }) =>
                        ['nav-sidebar__link', isActive && 'nav-sidebar__link--active']
                            .filter(Boolean)
                            .join(' ')
                    }
                >
                    {t('orders')}
                </NavLink>

                <NavLink
                    to="/groups"
                    id="nav-link-groups"
                    className={({ isActive }) =>
                        ['nav-sidebar__link', isActive && 'nav-sidebar__link--active']
                            .filter(Boolean)
                            .join(' ')
                    }
                >
                    {t('groups')}
                </NavLink>

                <NavLink
                    to="/products"
                    id="nav-link-products"
                    className={({ isActive }) =>
                        ['nav-sidebar__link', isActive && 'nav-sidebar__link--active']
                            .filter(Boolean)
                            .join(' ')
                    }
                >
                    {t('products')}
                </NavLink>

                <NavLink
                    to="/users"
                    id="nav-link-users"
                    className={({ isActive }) =>
                        ['nav-sidebar__link', isActive && 'nav-sidebar__link--active']
                            .filter(Boolean)
                            .join(' ')
                    }
                >
                    {t('users')}
                </NavLink>

                <NavLink
                    to="/settings"
                    id="nav-link-settings"
                    className={({ isActive }) =>
                        ['nav-sidebar__link', isActive && 'nav-sidebar__link--active']
                            .filter(Boolean)
                            .join(' ')
                    }
                >
                    {t('settings')}
                </NavLink>
            </nav>
        </aside>
    );
};

export default NavSidebar;
