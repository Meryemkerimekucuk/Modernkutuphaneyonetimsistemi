import { BookOpen, Clock, AlertCircle, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

export function UserDashboard() {
  // Kullanıcının ödünç aldığı kitaplar (mock data)
  const borrowedBooks = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      dueDate: '2026-04-25',
      daysLeft: 9,
      coverColor: 'bg-blue-100'
    },
    {
      id: '2',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      dueDate: '2026-04-20',
      daysLeft: 4,
      coverColor: 'bg-amber-100'
    },
    {
      id: '3',
      title: 'Foundation',
      author: 'Isaac Asimov',
      dueDate: '2026-04-18',
      daysLeft: 2,
      coverColor: 'bg-red-100'
    },
  ];

  const stats = [
    { label: 'Ödünç Alınan', value: '3', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Geç İade', value: '0', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Toplam Okunan', value: '24', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Üyelik Günü', value: '248', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recommendations = [
    { id: '1', title: 'The Pragmatic Programmer', author: 'Andy Hunt', category: 'Bilgisayar' },
    { id: '2', title: 'Homo Deus', author: 'Yuval Noah Harari', category: 'Tarih' },
    { id: '3', title: 'Benim Adım Kırmızı', author: 'Orhan Pamuk', category: 'Roman' },
    { id: '4', title: 'I, Robot', author: 'Isaac Asimov', category: 'Bilim Kurgu' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hoşgeldin Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-6 text-white">
        <h1 className="text-3xl mb-2">Hoş geldiniz, Ahmet!</h1>
        <p className="text-blue-100">Bugün okumak için harika bir gün 📚</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl mb-1">{stat.value}</div>
            <div className="text-sm text-zinc-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ödünç Alınan Kitaplar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
              <h2 className="text-lg">Ödünç Aldığınız Kitaplar</h2>
              <Link to="/user/my-books" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                Tümünü Gör
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6 space-y-4">
              {borrowedBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-4 p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors">
                  <div className={`w-16 h-20 ${book.coverColor} rounded-lg flex items-center justify-center`}>
                    <BookOpen className="w-8 h-8 text-zinc-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-zinc-900 mb-1 truncate">{book.title}</h3>
                    <p className="text-sm text-zinc-500 mb-2">{book.author}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm text-zinc-600">
                        İade: {new Date(book.dueDate).toLocaleDateString('tr-TR')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        book.daysLeft <= 3 
                          ? 'bg-red-100 text-red-700' 
                          : book.daysLeft <= 7 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {book.daysLeft} gün kaldı
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg transition-colors">
                    Yenile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Önerilen Kitaplar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-200">
              <h2 className="text-lg">Size Özel Öneriler</h2>
            </div>
            <div className="p-6 space-y-3">
              {recommendations.map((book) => (
                <Link
                  key={book.id}
                  to={`/user/catalog/${book.id}`}
                  className="block p-3 rounded-lg border border-zinc-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
                >
                  <h3 className="text-sm text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-1">{book.author}</p>
                  <span className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
                    {book.category}
                  </span>
                </Link>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-zinc-200">
              <Link to="/user/catalog" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                Tüm Katalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hızlı İşlemler */}
          <div className="bg-white rounded-xl border border-zinc-200 mt-6">
            <div className="px-6 py-4 border-b border-zinc-200">
              <h2 className="text-lg">Hızlı İşlemler</h2>
            </div>
            <div className="p-6 space-y-2">
              <Link
                to="/user/catalog"
                className="block px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Kitap Ara
              </Link>
              <Link
                to="/user/my-books"
                className="block px-4 py-3 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors text-center"
              >
                Kitaplarımı Görüntüle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
