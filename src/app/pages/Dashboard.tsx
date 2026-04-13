import { stats, borrowings, books, members } from '../data/mockData';
import { BookOpen, Users, ArrowLeftRight, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const chartData = [
  { month: 'Eki', borrowings: 145, returns: 132 },
  { month: 'Kas', borrowings: 178, returns: 165 },
  { month: 'Ara', borrowings: 203, returns: 198 },
  { month: 'Oca', borrowings: 167, returns: 172 },
  { month: 'Şub', borrowings: 189, returns: 181 },
  { month: 'Mar', borrowings: 223, returns: 215 },
  { month: 'Nis', borrowings: 234, returns: 189 },
];

const categoryData = [
  { name: 'Roman', value: 245 },
  { name: 'Bilgisayar', value: 312 },
  { name: 'Tarih', value: 167 },
  { name: 'Bilim', value: 203 },
  { name: 'Çocuk', value: 156 },
];

export function Dashboard() {
  const recentBorrowings = borrowings.slice(0, 5);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-900 mb-1">Dashboard</h1>
        <p className="text-zinc-500">Kütüphane yönetim sistemine hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
          <div className="text-3xl text-zinc-900 mb-1">{stats.totalBooks.toLocaleString('tr-TR')}</div>
          <div className="text-sm text-zinc-500">Toplam Kitap</div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
          </div>
          <div className="text-3xl text-zinc-900 mb-1">{stats.totalMembers.toLocaleString('tr-TR')}</div>
          <div className="text-sm text-zinc-500">Aktif Üye</div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs text-zinc-500">Bu ay</span>
          </div>
          <div className="text-3xl text-zinc-900 mb-1">{stats.activeBorrowings}</div>
          <div className="text-sm text-zinc-500">Aktif Ödünç</div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <Link to="/overdue" className="text-xs text-red-600 hover:underline">Görüntüle</Link>
          </div>
          <div className="text-3xl text-zinc-900 mb-1">{stats.overdueBooks}</div>
          <div className="text-sm text-zinc-500">Geç İade</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Borrowings Chart */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg text-zinc-900 mb-1">Ödünç ve İade İstatistikleri</h2>
            <p className="text-sm text-zinc-500">Son 7 aylık ödünç ve iade verileri</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12 }} />
              <YAxis tick={{ fill: '#71717a', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="borrowings" fill="#18181b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returns" fill="#a1a1aa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-zinc-900 rounded"></div>
              <span className="text-sm text-zinc-600">Ödünç</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-zinc-400 rounded"></div>
              <span className="text-sm text-zinc-600">İade</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg text-zinc-900 mb-1">Kategorilere Göre Dağılım</h2>
            <p className="text-sm text-zinc-500">En popüler kitap kategorileri</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis type="number" tick={{ fill: '#71717a', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#71717a', fontSize: 12 }} width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#18181b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Borrowings */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg text-zinc-900 mb-1">Son Ödünç İşlemleri</h2>
              <p className="text-sm text-zinc-500">En son yapılan ödünç işlemleri</p>
            </div>
            <Link to="/borrowings" className="text-sm text-zinc-900 hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-3">
            {recentBorrowings.map((borrowing) => {
              const book = books.find(b => b.id === borrowing.bookId);
              const member = members.find(m => m.id === borrowing.memberId);
              return (
                <div key={borrowing.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-sm text-zinc-900 mb-1">{book?.title}</div>
                    <div className="text-xs text-zinc-500">{member?.firstName} {member?.lastName}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      borrowing.status === 'borrowed' ? 'bg-blue-50 text-blue-700' :
                      borrowing.status === 'returned' ? 'bg-green-50 text-green-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {borrowing.status === 'borrowed' ? 'Ödünçte' :
                       borrowing.status === 'returned' ? 'İade Edildi' : 'Gecikmiş'}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">{borrowing.borrowDate}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg text-zinc-900 mb-1">Hızlı İşlemler</h2>
            <p className="text-sm text-zinc-500">Sık kullanılan işlemler</p>
          </div>
          <div className="space-y-2">
            <Link
              to="/borrowings/new"
              className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:border-zinc-900 transition-colors"
            >
              <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <span className="text-sm text-zinc-900">Yeni Ödünç</span>
            </Link>
            <Link
              to="/books/add"
              className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:border-zinc-900 transition-colors"
            >
              <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm text-zinc-900">Kitap Ekle</span>
            </Link>
            <Link
              to="/members/add"
              className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:border-zinc-900 transition-colors"
            >
              <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm text-zinc-900">Üye Ekle</span>
            </Link>
            <Link
              to="/returns"
              className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:border-zinc-900 transition-colors"
            >
              <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm text-zinc-900">İade İşlemleri</span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <div className="text-sm text-zinc-500 mb-3">Bugünün Özeti</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">Ödünç Verilen</span>
                <span className="text-zinc-900">{stats.todayBorrowings}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">İade Edilen</span>
                <span className="text-zinc-900">{stats.todayReturns}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">Mevcut Kitap</span>
                <span className="text-zinc-900">{stats.availableBooks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
