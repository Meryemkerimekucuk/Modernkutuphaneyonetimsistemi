import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { books, categories, publishers } from '../data/mockData';
import { ArrowLeft, Save } from 'lucide-react';

export function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b.id === id);

  const [formData, setFormData] = useState(book || {
    title: '',
    author: '',
    isbn: '',
    categoryId: '',
    publisherId: '',
    publishYear: new Date().getFullYear(),
    pageCount: 0,
    stock: 0,
    language: 'Türkçe',
    shelfLocation: '',
    description: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated book:', formData);
    navigate(`/books/${id}`);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to={`/books/${id}`}
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl text-zinc-900 mb-1">Kitap Düzenle</h1>
          <p className="text-zinc-500">{book.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg text-zinc-900 mb-6">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-700 mb-2">Kitap Adı *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Yazar *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">ISBN *</label>
              <input
                type="text"
                required
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Kategori *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Yayınevi *</label>
              <select
                required
                value={formData.publisherId}
                onChange={(e) => setFormData({ ...formData, publisherId: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {publishers.map(pub => (
                  <option key={pub.id} value={pub.id}>{pub.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Yayın Yılı *</label>
              <input
                type="number"
                required
                value={formData.publishYear}
                onChange={(e) => setFormData({ ...formData, publishYear: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Sayfa Sayısı *</label>
              <input
                type="number"
                required
                value={formData.pageCount}
                onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Dil *</label>
              <select
                required
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="Türkçe">Türkçe</option>
                <option value="İngilizce">İngilizce</option>
                <option value="Almanca">Almanca</option>
                <option value="Fransızca">Fransızca</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Toplam Stok *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Raf Konumu *</label>
              <input
                type="text"
                required
                value={formData.shelfLocation}
                onChange={(e) => setFormData({ ...formData, shelfLocation: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-700 mb-2">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            Değişiklikleri Kaydet
          </button>
          <Link
            to={`/books/${id}`}
            className="px-6 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
