import { Calendar, BookOpen, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function History() {
  // Mock data - kullanıcının tüm geçmiş işlemleri
  const history = [
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Andy Hunt',
      borrowDate: '2026-03-01',
      dueDate: '2026-03-15',
      returnDate: '2026-03-15',
      status: 'returned',
      daysLate: 0,
    },
    {
      id: '2',
      title: 'Homo Deus',
      author: 'Yuval Noah Harari',
      borrowDate: '2026-02-15',
      dueDate: '2026-03-01',
      returnDate: '2026-03-05',
      status: 'late',
      daysLate: 4,
    },
    {
      id: '3',
      title: 'Benim Adım Kırmızı',
      author: 'Orhan Pamuk',
      borrowDate: '2026-01-20',
      dueDate: '2026-02-03',
      returnDate: '2026-02-03',
      status: 'returned',
      daysLate: 0,
    },
    {
      id: '4',
      title: 'I, Robot',
      author: 'Isaac Asimov',
      borrowDate: '2026-01-05',
      dueDate: '2026-01-19',
      returnDate: '2026-01-18',
      status: 'early',
      daysLate: 0,
    },
    {
      id: '5',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      borrowDate: '2025-12-20',
      dueDate: '2026-01-03',
      returnDate: '2026-01-03',
      status: 'returned',
      daysLate: 0,
    },
    {
      id: '6',
      title: 'Design Patterns',
      author: 'Gang of Four',
      borrowDate: '2025-12-01',
      dueDate: '2025-12-15',
      returnDate: '2025-12-20',
      status: 'late',
      daysLate: 5,
    },
  ];

  // İstatistikler
  const stats = {
    total: history.length,
    onTime: history.filter((h) => h.status === 'returned' || h.status === 'early').length,
    late: history.filter((h) => h.status === 'late').length,
    totalDaysLate: history.reduce((sum, h) => sum + h.daysLate, 0),
  };

  // Tarih gruplandırma fonksiyonu
  const groupByMonth = (items: typeof history) => {
    const groups: { [key: string]: typeof history } = {};
    
    items.forEach((item) => {
      const date = new Date(item.borrowDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
      
      if (!groups[monthName]) {
        groups[monthName] = [];
      }
      groups[monthName].push(item);
    });
    
    return groups;
  };

  const groupedHistory = groupByMonth(history);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Geçmiş İşlemler</h1>
        <p className="text-zinc-600">Tüm ödünç alma ve iade işlemleriniz</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">{stats.total}</div>
              <div className="text-sm text-zinc-600">Toplam Kitap</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">{stats.onTime}</div>
              <div className="text-sm text-zinc-600">Zamanında İade</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">{stats.late}</div>
              <div className="text-sm text-zinc-600">Geç İade</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">{stats.totalDaysLate}</div>
              <div className="text-sm text-zinc-600">Toplam Geç Gün</div>
            </div>
          </div>
        </div>
      </div>

      {/* Başarı Oranı */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">İade Başarı Oranı</h2>
          <span className="text-2xl">
            {stats.total > 0 ? Math.round((stats.onTime / stats.total) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-zinc-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-600 h-full rounded-full transition-all"
            style={{ width: `${stats.total > 0 ? (stats.onTime / stats.total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-sm text-zinc-600 mt-2">
          {stats.onTime} zamanında, {stats.late} geç iade
        </p>
      </div>

      {/* Geçmiş İşlemler - Aylara Göre Gruplandırılmış */}
      <div className="space-y-6">
        {Object.entries(groupedHistory).map(([month, items]) => (
          <div key={month} className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
            {/* Ay Başlığı */}
            <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-zinc-600" />
              <h2 className="text-lg capitalize">{month}</h2>
              <span className="text-sm text-zinc-600">({items.length} işlem)</span>
            </div>

            {/* İşlemler Listesi */}
            <div className="divide-y divide-zinc-100">
              {items.map((item) => (
                <div key={item.id} className="p-6 hover:bg-zinc-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Kitap Bilgileri */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-zinc-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-zinc-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-zinc-600 mb-3">{item.author}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Ödünç: {new Date(item.borrowDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>İade: {new Date(item.returnDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Durum */}
                    <div className="lg:w-48">
                      {item.status === 'returned' || item.status === 'early' ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">
                            {item.status === 'early' ? 'Erken İade' : 'Zamanında İade'}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{item.daysLate} gün geç</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {history.length === 0 && (
        <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h2 className="text-2xl text-zinc-900 mb-2">Henüz işlem geçmişi yok</h2>
          <p className="text-zinc-600">Kitap ödünç aldığınızda geçmişiniz burada görünecek</p>
        </div>
      )}
    </div>
  );
}
