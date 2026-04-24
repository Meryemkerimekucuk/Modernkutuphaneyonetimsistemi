import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, BookOpen, Calendar, FileText, MapPin, Globe, Star, Heart, Share2 } from 'lucide-react';
import { books, categories, publishers } from '../../data/mockData';

export function UserBookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl mb-4">Kitap bulunamadı</h2>
        <button
          onClick={() => navigate('/user/catalog')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Kataloga Dön
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.id === book.categoryId);
  const publisher = publishers.find((p) => p.id === book.publisherId);
  const isAvailable = book.available > 0;

  const handleReserve = () => {
    setShowReserveModal(true);
    // Burada rezervasyon işlemi yapılacak
  };

  const handleConfirmReserve = () => {
    setShowReserveModal(false);
    // Rezervasyon onayı
    alert('Kitap rezerve edildi!');
    navigate('/user/my-books');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Geri Butonu */}
      <button
        onClick={() => navigate('/user/catalog')}
        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Kataloga Dön
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Kitap Görseli ve Hızlı İşlemler */}
        <div className="lg:col-span-1">
          {/* Kitap Kapağı */}
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-4">
            <div className="aspect-[3/4] bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
              <BookOpen className="w-32 h-32 text-zinc-400" />
            </div>
          </div>

          {/* Durum Kartı */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-600">Durum</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                isAvailable 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isAvailable ? 'Mevcut' : 'Stokta Yok'}
              </span>
            </div>
            <div className="text-2xl mb-1">{book.available}/{book.stock}</div>
            <div className="text-sm text-zinc-600">Mevcut Kopya</div>
          </div>

          {/* İşlem Butonları */}
          <div className="space-y-2">
            <button
              onClick={handleReserve}
              disabled={!isAvailable}
              className={`w-full px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isAvailable
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              {isAvailable ? 'Rezerve Et' : 'Stokta Yok'}
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-full px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isFavorite
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </button>

            <button className="w-full px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Paylaş
            </button>
          </div>
        </div>

        {/* Sağ Kolon - Kitap Detayları */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-zinc-200 p-8">
            {/* Başlık ve Yazar */}
            <div className="mb-6">
              <h1 className="text-4xl mb-3">{book.title}</h1>
              <p className="text-xl text-zinc-600 mb-4">{book.author}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-sm">
                  {category?.name}
                </span>
                <span className="text-sm text-zinc-500">•</span>
                <span className="text-sm text-zinc-600">{book.publishYear}</span>
              </div>

              {/* Değerlendirme */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-zinc-600">(4.5 - 127 değerlendirme)</span>
              </div>
            </div>

            {/* Açıklama */}
            <div className="mb-6">
              <h2 className="text-xl mb-3">Açıklama</h2>
              <p className="text-zinc-600 leading-relaxed">
                {book.description || 'Bu kitap için henüz bir açıklama eklenmemiş.'}
              </p>
            </div>

            {/* Kitap Bilgileri */}
            <div className="mb-6">
              <h2 className="text-xl mb-4">Kitap Bilgileri</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">ISBN</div>
                    <div className="text-zinc-900">{book.isbn}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Yayın Yılı</div>
                    <div className="text-zinc-900">{book.publishYear}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Sayfa Sayısı</div>
                    <div className="text-zinc-900">{book.pageCount} sayfa</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Dil</div>
                    <div className="text-zinc-900">{book.language}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Raf Konumu</div>
                    <div className="text-zinc-900">{book.shelfLocation}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Yayınevi</div>
                    <div className="text-zinc-900">{publisher?.name}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benzer Kitaplar */}
            <div>
              <h2 className="text-xl mb-4">Benzer Kitaplar</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {books.slice(0, 3).map((similarBook) => (
                  <Link
                    key={similarBook.id}
                    to={`/user/catalog/${similarBook.id}`}
                    className="p-4 border border-zinc-200 rounded-lg hover:border-blue-600 transition-colors group"
                  >
                    <div className="aspect-[3/4] bg-zinc-100 rounded-lg mb-3 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-zinc-400" />
                    </div>
                    <h3 className="text-sm text-zinc-900 mb-1 line-clamp-2 group-hover:text-blue-600">
                      {similarBook.title}
                    </h3>
                    <p className="text-xs text-zinc-500">{similarBook.author}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rezervasyon Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl mb-4">Rezervasyon Onayı</h2>
            <p className="text-zinc-600 mb-6">
              <strong>{book.title}</strong> kitabını rezerve etmek istediğinizden emin misiniz?
            </p>
            <div className="bg-zinc-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-600">İade Tarihi:</span>
                <span className="text-sm text-zinc-900">
                  {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-600">Süre:</span>
                <span className="text-sm text-zinc-900">14 gün</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReserveModal(false)}
                className="flex-1 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleConfirmReserve}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Rezerve Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
