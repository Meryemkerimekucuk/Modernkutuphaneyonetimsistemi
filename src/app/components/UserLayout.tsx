import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import {
  BookOpen, Search, User, LogOut, Menu, X, Home, Clock, Heart
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Ana Sayfa', href: '/user', icon: Home },
  { name: 'Kitap Kataloğu', href: '/user/catalog', icon: Search },
  { name: 'Ödünç Kitaplarım', href: '/user/my-books', icon: BookOpen },
  { name: 'Favorilerim', href: '/user/favorites', icon: Heart },
  { name: 'Geçmiş İşlemler', href: '/user/history', icon: Clock },
  { name: 'Profilim', href: '/user/profile', icon: User },
];

export function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/user') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg tracking-tight">Kütüphane</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-colors
                    ${isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[15px]">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="border-t border-zinc-200 p-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[15px]">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 lg:flex-none" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-50">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm">AY</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm text-zinc-900">Ahmet Yılmaz</div>
                <div className="text-xs text-zinc-500">Aktif Üye</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
