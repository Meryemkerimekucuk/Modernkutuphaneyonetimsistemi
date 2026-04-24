import { Heart, BookOpen, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Andy Hunt',
      category: 'Bilgisayar',
      rating: 4.7,
      available: true,
      addedDate: '2026-04-01',
    },
    {
      id: '2',
      title: 'Homo Deus',
      author: 'Yuval Noah Harari',
      category: 'Tarih',
      rating: 4.5,
      available: false,
      addedDate: '2026-03-28',
    },
    {
      id: '3',
      title: 'Benim Adım Kırmızı',
      author: 'Orhan Pamuk',
      category: 'Roman',
      rating: 4.8,
      available: true,
      addedDate: '2026-03-15',
    },
    {
      id: '4',
      title: 'I, Robot',
      author: 'Isaac Asimov',
      category: 'Bilim Kurgu',
      rating: 4.6,
      available: true,
      addedDate: '2026-03-10',
    },
  ]);

  const handleRemove = (bookId: string) => {
    setFavorites(favorites.filter((book) => book.id !== bookId));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Favori Kitaplarım</h1>
        <p className="text-zinc-600">Beğendiğiniz ve daha sonra okumak istediğiniz kitaplar</p>
      </div>

      {/* İstatistik Kartı */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl mb-2">{favorites.length}</div>
            <div className="text-red-100">Favori Kitap</div>
          </div>
          <Heart className="w-20 h-20 opacity-20" />
        </div>
      </div>

      {/* Favori Kitaplar Listesi */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center">
          <Heart className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h2 className="text-2xl text-zinc-900 mb-2">Henüz favori kitap yok</h2>
          <p className="text-zinc-600 mb-6">
            Beğendiğiniz kitapları favorilere ekleyerek daha sonra kolayca bulabilirsiniz
          </p>
          <Link
            to="/user/catalog"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kitap Kataloğu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="flex">
                {/* Kitap Görseli */}
                <Link
                  to={`/user/catalog/${book.id}`}
                  className="w-32 h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center flex-shrink-0"
                >
                  <BookOpen className="w-12 h-12 text-zinc-400" />
                </Link>

                {/* Kitap Bilgileri */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex-1">
                    <Link
                      to={`/user/catalog/${book.id}`}
                      className="text-lg text-zinc-900 hover:text-blue-600 mb-2 line-clamp-2 block transition-colors"
                    >
                      {book.title}
                    </Link>
                    <p className="text-sm text-zinc-600 mb-3">{book.author}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
                        {book.category}
                      </span>
                      {book.available ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                          Mevcut
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                          Stokta Yok
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-zinc-900">{book.rating}</span>
                      </div>
                      <span className="text-xs text-zinc-500">
                        • {new Date(book.addedDate).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="flex gap-2">
                    <Link
                      to={`/user/catalog/${book.id}`}
                      className={`flex-1 px-4 py-2 text-sm text-center rounded-lg transition-colors ${
                        book.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      {book.available ? 'Rezerve Et' : 'Stokta Yok'}
                    </Link>
                    <button
                      onClick={() => handleRemove(book.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Favorilerden Kaldır"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alt Bilgi */}
      {favorites.length > 0 && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-zinc-900 mb-1">Favori kitaplarınızı takip edin</h3>
              <p className="text-sm text-zinc-600">
                Kitaplar stoka girdiğinde bildirim almak için favori listenizi düzenli kontrol edin.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
