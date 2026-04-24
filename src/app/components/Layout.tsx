import { Link, Outlet, useLocation } from 'react-router';
import {
  BookOpen, Users, ArrowLeftRight, TrendingUp,
  FolderOpen, UserPen, Building2, FileBarChart,
  Settings, User, LayoutDashboard, AlertCircle,
  BookPlus, UserPlus, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Kitaplar',
    icon: BookOpen,
    children: [
      { name: 'Tüm Kitaplar', href: '/admin/books' },
      { name: 'Kitap Ekle', href: '/admin/books/add' },
      { name: 'Kategoriler', href: '/admin/categories' },
      { name: 'Yazarlar', href: '/admin/authors' },
      { name: 'Yayınevleri', href: '/admin/publishers' },
    ]
  },
  {
    name: 'Üyeler',
    icon: Users,
    children: [
      { name: 'Tüm Üyeler', href: '/admin/members' },
      { name: 'Üye Ekle', href: '/admin/members/add' },
    ]
  },
  {
    name: 'İşlemler',
    icon: ArrowLeftRight,
    children: [
      { name: 'Ödünç İşlemleri', href: '/admin/borrowings' },
      { name: 'Yeni Ödünç', href: '/admin/borrowings/new' },
      { name: 'İadeler', href: '/admin/returns' },
      { name: 'Geç İadeler', href: '/admin/overdue' },
    ]
  },
  {
    name: 'Raporlar',
    icon: FileBarChart,
    children: [
      { name: 'Raporlar', href: '/admin/reports' },
      { name: 'İstatistikler', href: '/admin/statistics' },
    ]
  },
];

const bottomNav = [
  { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
  { name: 'Profil', href: '/admin/profile', icon: User },
];

export function Layout() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children: { href: string }[] | undefined) =>
    children?.some(child => location.pathname.startsWith(child.href));

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
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
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
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg
                          transition-colors
                          ${isParentActive(item.children)
                            ? 'bg-zinc-100 text-zinc-900'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="text-[15px]">{item.name}</span>
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform ${expandedMenu === item.name ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedMenu === item.name && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`
                                block px-3 py-2 rounded-lg text-[14px]
                                transition-colors
                                ${isActive(child.href)
                                  ? 'bg-zinc-900 text-white'
                                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                                }
                              `}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg
                        transition-colors
                        ${isActive(item.href!)
                          ? 'bg-zinc-900 text-white'
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-[15px]">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-zinc-200 p-3 space-y-1">
            {bottomNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg
                  transition-colors
                  ${isActive(item.href)
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[15px]">{item.name}</span>
              </Link>
            ))}
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
              <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="text-white text-sm">AY</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm text-zinc-900">Admin</div>
                <div className="text-xs text-zinc-500">admin@kutuphane.com</div>
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