import { useParams, Link } from 'react-router';
import { books, categories, publishers, borrowings, members } from '../data/mockData';
import { ArrowLeft, Edit, BookOpen, Calendar, MapPin, Globe, Hash } from 'lucide-react';

export function BookDetail() {
  const { id } = useParams();
  const book = books.find(b => b.id === id);
  const category = categories.find(c => c.id === book?.categoryId);
  const publisher = publishers.find(p => p.id === book?.publisherId);
  const bookBorrowings = borrowings.filter(b => b.bookId === id);

  if (!book) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl text-zinc-900 mb-2">Kitap bulunamadı</h2>
          <Link to="/books" className="text-zinc-600 hover:underline">Kitap listesine dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/books"
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl text-zinc-900 mb-1">Kitap Detayı</h1>
          <p className="text-zinc-500">Kitap bilgileri ve ödünç geçmişi</p>
        </div>
        <Link
          to={`/books/${book.id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Düzenle
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Info */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl text-zinc-900 mb-2">{book.title}</h2>
              <p className="text-zinc-600">{book.author}</p>
            </div>

            {book.description && (
              <div className="mb-6 pb-6 border-b border-zinc-100">
                <h3 className="text-sm text-zinc-500 mb-2">Açıklama</h3>
                <p className="text-zinc-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm">ISBN</span>
                </div>
                <div className="text-zinc-900 font-mono">{book.isbn}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Kategori</span>
                </div>
                <div className="text-zinc-900">{category?.name}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Yayın Yılı</span>
                </div>
                <div className="text-zinc-900">{book.publishYear}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Sayfa Sayısı</span>
                </div>
                <div className="text-zinc-900">{book.pageCount}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Dil</span>
                </div>
                <div className="text-zinc-900">{book.language}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Raf Konumu</span>
                </div>
                <div className="text-zinc-900">{book.shelfLocation}</div>
              </div>
            </div>
          </div>

          {/* Borrowing History */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-lg text-zinc-900 mb-4">Ödünç Geçmişi</h3>
            <div className="space-y-3">
              {bookBorrowings.length > 0 ? (
                bookBorrowings.map(borrowing => {
                  const member = members.find(m => m.id === borrowing.memberId);
                  return (
                    <div key={borrowing.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                      <div>
                        <div className="text-sm text-zinc-900 mb-1">
                          {member?.firstName} {member?.lastName}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {borrowing.borrowDate} - {borrowing.returnDate || 'Devam ediyor'}
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        borrowing.status === 'borrowed' ? 'bg-blue-50 text-blue-700' :
                        borrowing.status === 'returned' ? 'bg-green-50 text-green-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {borrowing.status === 'borrowed' ? 'Ödünçte' :
                         borrowing.status === 'returned' ? 'İade Edildi' : 'Gecikmiş'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-zinc-500">
                  Henüz ödünç kaydı bulunmamaktadır
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stock Info */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-sm text-zinc-500 mb-4">Stok Bilgisi</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Toplam Stok</span>
                  <span className="text-2xl text-zinc-900">{book.stock}</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Mevcut</span>
                  <span className="text-2xl text-green-600">{book.available}</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(book.available / book.stock) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Ödünçte</span>
                  <span className="text-2xl text-blue-600">{book.stock - book.available}</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${((book.stock - book.available) / book.stock) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publisher Info */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-sm text-zinc-500 mb-4">Yayınevi Bilgisi</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-zinc-500 mb-1">Yayınevi</div>
                <div className="text-sm text-zinc-900">{publisher?.name}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-1">Ülke</div>
                <div className="text-sm text-zinc-900">{publisher?.country}</div>
              </div>
              {publisher?.website && (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Website</div>
                  <a href={`https://${publisher.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    {publisher.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-sm text-zinc-500 mb-4">Hızlı İşlemler</h3>
            <div className="space-y-2">
              <Link
                to="/borrowings/new"
                className="block w-full px-4 py-2 bg-zinc-900 text-white text-center rounded-lg hover:bg-zinc-800 transition-colors text-sm"
              >
                Ödünç Ver
              </Link>
              <Link
                to={`/books/${book.id}/edit`}
                className="block w-full px-4 py-2 border border-zinc-200 text-zinc-900 text-center rounded-lg hover:border-zinc-900 transition-colors text-sm"
              >
                Düzenle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
