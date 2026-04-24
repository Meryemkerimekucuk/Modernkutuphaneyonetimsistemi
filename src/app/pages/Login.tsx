import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, LogIn, User, Shield } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'admin' | 'user'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'admin') {
      // Admin girişi
      navigate('/admin');
    } else {
      // Kullanıcı girişi
      navigate('/user');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl tracking-tight mb-2">Kütüphane Yönetim Sistemi</h1>
          <p className="text-zinc-600">Hesabınıza giriş yapın</p>
        </div>

        {/* Giriş Kartı */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
          {/* Kullanıcı Tipi Seçimi */}
          <div className="flex gap-2 p-1 bg-zinc-100 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setUserType('user')}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all
                ${userType === 'user' 
                  ? 'bg-white shadow-sm text-zinc-900' 
                  : 'text-zinc-600 hover:text-zinc-900'
                }
              `}
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Kullanıcı</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all
                ${userType === 'admin' 
                  ? 'bg-white shadow-sm text-zinc-900' 
                  : 'text-zinc-600 hover:text-zinc-900'
                }
              `}
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">Yönetici</span>
            </button>
          </div>

          {/* Giriş Formu */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-700 mb-2">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userType === 'admin' ? 'admin@kutuphane.com' : 'kullanici@ornek.com'}
                className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-zinc-700 mb-2">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-zinc-300" />
                <span className="text-zinc-600">Beni hatırla</span>
              </label>
              <a href="#" className="text-zinc-900 hover:underline">
                Şifremi unuttum
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 text-white px-4 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Giriş Yap
            </button>
          </form>

          {/* Demo Bilgileri */}
          <div className="mt-6 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-2">Demo hesapları:</p>
            <div className="space-y-1 text-xs text-zinc-500">
              <p><strong>Yönetici:</strong> admin@kutuphane.com / admin123</p>
              <p><strong>Kullanıcı:</strong> kullanici@ornek.com / user123</p>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Hesabınız yok mu?{' '}
          <a href="#" className="text-zinc-900 hover:underline">
            Üye olun
          </a>
        </p>
      </div>
    </div>
  );
}
