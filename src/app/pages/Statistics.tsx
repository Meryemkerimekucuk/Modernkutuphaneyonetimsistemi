import { stats, borrowings, books, members, categories } from '../data/mockData';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
  { month: 'Eki', borrowings: 145, returns: 132, new_members: 23 },
  { month: 'Kas', borrowings: 178, returns: 165, new_members: 31 },
  { month: 'Ara', borrowings: 203, returns: 198, new_members: 28 },
  { month: 'Oca', borrowings: 167, returns: 172, new_members: 19 },
  { month: 'Şub', borrowings: 189, returns: 181, new_members: 34 },
  { month: 'Mar', borrowings: 223, returns: 215, new_members: 41 },
  { month: 'Nis', borrowings: 234, returns: 189, new_members: 47 },
];

const categoryDistribution = [
  { name: 'Roman', value: 245, color: '#18181b' },
  { name: 'Bilgisayar', value: 312, color: '#3b82f6' },
  { name: 'Tarih', value: 167, color: '#8b5cf6' },
  { name: 'Bilim', value: 203, color: '#f59e0b' },
  { name: 'Çocuk', value: 156, color: '#10b981' },
];

const membershipTypes = [
  { name: 'Öğrenci', value: 412, color: '#3b82f6' },
  { name: 'Öğretmen', value: 189, color: '#8b5cf6' },
  { name: 'Genel', value: 246, color: '#71717a' },
];

export function Statistics() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-900 mb-1">İstatistikler</h1>
        <p className="text-zinc-500">Detaylı kütüphane istatistikleri ve analizler</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-500">Toplam Kitap</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl text-zinc-900 mb-1">{stats.totalBooks.toLocaleString('tr-TR')}</div>
          <div className="text-xs text-green-600">+12% bu ay</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-500">Aktif Üye</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl text-zinc-900 mb-1">{stats.totalMembers}</div>
          <div className="text-xs text-green-600">+8% bu ay</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-500">Ödünç Oranı</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl text-zinc-900 mb-1">
            {((stats.activeBorrowings / stats.totalBooks) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-zinc-500">Aktif kullanım</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-500">İade Oranı</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl text-zinc-900 mb-1">94%</div>
          <div className="text-xs text-green-600">+2% bu ay</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg text-zinc-900 mb-1">Aylık Trend Analizi</h2>
          <p className="text-sm text-zinc-500 mb-6">Son 7 aylık ödünç ve iade verileri</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12 }} />
              <YAxis tick={{ fill: '#71717a', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="borrowings" stroke="#18181b" strokeWidth={2} name="Ödünç" />
              <Line type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={2} name="İade" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg text-zinc-900 mb-1">Kategori Dağılımı</h2>
          <p className="text-sm text-zinc-500 mb-6">Kitap kategorilerine göre dağılım</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* New Members */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg text-zinc-900 mb-1">Yeni Üye Trendi</h2>
          <p className="text-sm text-zinc-500 mb-6">Aylık yeni üye kayıtları</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12 }} />
              <YAxis tick={{ fill: '#71717a', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="new_members" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Yeni Üye" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Membership Types */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg text-zinc-900 mb-1">Üyelik Tipleri</h2>
          <p className="text-sm text-zinc-500 mb-6">Üye tipine göre dağılım</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={membershipTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {membershipTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-lg text-zinc-900 mb-6">Performans Metrikleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-zinc-500 mb-2">Ortalama Ödünç Süresi</div>
            <div className="text-2xl text-zinc-900 mb-1">12.4 gün</div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '62%' }} />
            </div>
          </div>
          <div>
            <div className="text-sm text-zinc-500 mb-2">Zamanında İade Oranı</div>
            <div className="text-2xl text-zinc-900 mb-1">94%</div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }} />
            </div>
          </div>
          <div>
            <div className="text-sm text-zinc-500 mb-2">Üye Memnuniyeti</div>
            <div className="text-2xl text-zinc-900 mb-1">4.7/5</div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
