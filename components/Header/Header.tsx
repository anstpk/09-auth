import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        
        <nav className={css.navigation}>
          <ul className={css.navigationList}>
            <li className={css.navigationItem}>
              <Link href="/notes/filter/all" className={css.navigationLink}>
                Notes
              </Link>
            </li>
            {/* Динамічні посилання (Login/Register або Profile/Logout) */}
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}