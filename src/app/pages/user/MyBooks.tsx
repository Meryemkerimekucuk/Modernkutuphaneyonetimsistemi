import { useState } from 'react';
import { BookOpen, Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

export function MyBooks() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  // Mock data - kullanıcının aktif ödünç kitapları
  const activeBooks = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      borrowDate: '2026-04-02',
      dueDate: '2026-04-25',
      daysLeft: 9,
      renewCount: 0,
      maxRenew: 2,
      status: 'normal' as const,
    },
    {
      id: '2',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      borrowDate: '2026-04-06',
      dueDate: '2026-04-20',
      daysLeft: 4,
      renewCount: 1,
      maxRenew: 2,
      status: 'warning' as const,
    },
    {
      id: '3',
      title: 'Foundation',
      author: 'Isaac Asimov',
      borrowDate: '2026-04-10',
      dueDate: '2026-04-18',
      daysLeft: 2,
      renewCount: 0,
      maxRenew: 2,
      status: 'urgent' as const,
    },
  ];

  // Mock data - tamamlanmış işlemler
  const completedBooks = [
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Andy Hunt',
      borrowDate: '2026-03-01',
      returnDate: '2026-03-15',
      status: 'returned' as const,
    },
    {
      id: '2',
      title: 'Homo Deus',
      author: 'Yuval Noah Harari',
      borrowDate: '2026-02-15',
      returnDate: '2026-03-05',
      daysLate: 4,
      status: 'late' as const,
    },
    {
      id: '3',
      title: 'Benim Adım Kırmızı',
      author: 'Orhan Pamuk',
      borrowDate: '2026-01-20',
      returnDate: '2026-02-03',
      status: 'returned' as const,
    },
  ];

  const handleRenew = (bookId: string) => {
    alert(`${bookId} ID'li kitap için yenileme talebi gönderildi!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'normal':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Kitaplarım</h1>
        <p className="text-zinc-600">Ödünç aldığınız ve geçmiş işlemleriniz</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">{activeBooks.length}</div>
              <div className="text-sm text-zinc-600">Aktif Ödünç</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">
                {activeBooks.filter(b => b.daysLeft <= 7).length}
              </div>
              <div className="text-sm text-zinc-600">Yaklaşan İadeler</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl mb-1">{completedBooks.length}</div>
              <div className="text-sm text-zinc-600">Tamamlanan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="flex border-b border-zinc-200">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-6 py-4 transition-colors ${
              activeTab === 'active'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            Aktif Ödünç Kitaplar ({activeBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 px-6 py-4 transition-colors ${
              activeTab === 'completed'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            Geçmiş İşlemler ({completedBooks.length})
          </button>
        </div>

        {/* Aktif Kitaplar */}
        {activeTab === 'active' && (
          <div className="p-6">
            {activeBooks.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-xl text-zinc-900 mb-2">Henüz ödünç kitap yok</h3>
                <p className="text-zinc-600">Katalogdan kitap rezerve edebilirsiniz</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeBooks.map((book) => (
                  <div key={book.id} className={`p-6 border rounded-xl ${getStatusColor(book.status)}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Kitap Bilgileri */}
                      <div className="flex-1">
                        <h3 className="text-lg mb-1">{book.title}</h3>
                        <p className="text-sm opacity-80 mb-3">{book.author}</p>
                        
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <div>
                              <div className="opacity-80">Ödünç Tarihi</div>
                              <div>{new Date(book.borrowDate).toLocaleDateString('tr-TR')}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <div>
                              <div className="opacity-80">İade Tarihi</div>
                              <div>{new Date(book.dueDate).toLocaleDateString('tr-TR')}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <div>
                              <div className="opacity-80">Kalan Süre</div>
                              <div>{book.daysLeft} gün</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* İşlem Butonları */}
                      <div className="flex flex-col gap-2 lg:w-48">
                        <button
                          onClick={() => handleRenew(book.id)}
                          disabled={book.renewCount >= book.maxRenew}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            book.renewCount >= book.maxRenew
                              ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                              : 'bg-white hover:bg-zinc-50 border border-zinc-300'
                          }`}
                        >
                          {book.renewCount >= book.maxRenew ? 'Yenileme Yok' : 'Süreyi Uzat'}
                        </button>
                        <div className="text-xs text-center opacity-80">
                          Yenileme: {book.renewCount}/{book.maxRenew}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tamamlanmış İşlemler */}
        {activeTab === 'completed' && (
          <div className="p-6">
            {completedBooks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-xl text-zinc-900 mb-2">Henüz tamamlanmış işlem yok</h3>
              </div>
            ) : (
              <div className="space-y-4">
                {completedBooks.map((book) => (
                  <div key={book.id} className="p-6 border border-zinc-200 rounded-xl bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Kitap Bilgileri */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-zinc-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg text-zinc-900 mb-1">{book.title}</h3>
                            <p className="text-sm text-zinc-600 mb-3">{book.author}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                              <div>
                                <span className="opacity-70">Ödünç: </span>
                                {new Date(book.borrowDate).toLocaleDateString('tr-TR')}
                              </div>
                              <div>
                                <span className="opacity-70">İade: </span>
                                {new Date(book.returnDate).toLocaleDateString('tr-TR')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Durum */}
                      <div>
                        {book.status === 'returned' ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Zamanında İade</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">{book.daysLate} gün geç</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
