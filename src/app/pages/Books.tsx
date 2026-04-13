import { useState } from 'react';
import { Link } from 'react-router';
import { books, categories, publishers } from '../data/mockData';
import { Search, Filter, BookOpen, Edit, Trash2, Eye } from 'lucide-react';

export function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || book.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl text-zinc-900 mb-1">Kitaplar</h1>
          <p className="text-zinc-500">Kütüphanedeki tüm kitapları yönetin</p>
        </div>
        <Link
          to="/books/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Yeni Kitap Ekle
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Kitap ara (başlık, yazar, ISBN)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">{books.length}</div>
          <div className="text-sm text-zinc-500">Toplam Kitap</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">
            {books.reduce((sum, book) => sum + book.available, 0)}
          </div>
          <div className="text-sm text-zinc-500">Mevcut Kitap</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">
            {books.reduce((sum, book) => sum + book.stock, 0)}
          </div>
          <div className="text-sm text-zinc-500">Toplam Stok</div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Kitap Bilgileri</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">ISBN</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Kategori</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Yayınevi</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Stok</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Mevcut</th>
                <th className="text-right px-6 py-4 text-sm text-zinc-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredBooks.map((book) => {
                const category = categories.find(c => c.id === book.categoryId);
                const publisher = publishers.find(p => p.id === book.publisherId);
                return (
                  <tr key={book.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-zinc-900 mb-1">{book.title}</div>
                        <div className="text-xs text-zinc-500">{book.author}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600 font-mono">{book.isbn}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">{category?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">{publisher?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-900">{book.stock}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        book.available > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {book.available}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/books/${book.id}`}
                          className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/books/${book.id}/edit`}
                          className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          Aramanıza uygun kitap bulunamadı
        </div>
      )}
    </div>
  );
}
