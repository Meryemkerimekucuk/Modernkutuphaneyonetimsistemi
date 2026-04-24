import { useState } from 'react';
import { Search, Filter, BookOpen, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { books, categories, authors } from '../../data/mockData';

export function BookCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  // Filtreleme ve arama
  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || book.categoryId === selectedCategory;
    const matchesAuthor = selectedAuthor === 'all' || book.author === selectedAuthor;
    
    return matchesSearch && matchesCategory && matchesAuthor;
  });

  // Sıralama
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'year':
        return b.publishYear - a.publishYear;
      default:
        return 0;
    }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Kitap Kataloğu</h1>
        <p className="text-zinc-600">Tüm kitapları keşfedin ve rezervasyon yapın</p>
      </div>

      {/* Arama ve Filtreler */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-6">
        {/* Arama Çubuğu */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap adı veya yazar ara..."
            className="w-full pl-12 pr-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Filtre Toggle Butonu (Mobil) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-2 bg-zinc-100 rounded-lg mb-4"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtreler
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Filtreler */}
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
          <div>
            <label className="block text-sm text-zinc-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-700 mb-2">Yazar</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Tüm Yazarlar</option>
              {authors.map((author) => (
                <option key={author.id} value={author.name}>{author.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-700 mb-2">Sırala</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="title">Kitap Adı</option>
              <option value="author">Yazar</option>
              <option value="year">Yayın Yılı</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedAuthor('all');
                setSortBy('title');
              }}
              className="w-full px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg transition-colors"
            >
              Sıfırla
            </button>
          </div>
        </div>

        {/* Sonuç Sayısı */}
        <div className="mt-4 pt-4 border-t border-zinc-200">
          <p className="text-sm text-zinc-600">
            <strong>{sortedBooks.length}</strong> kitap bulundu
          </p>
        </div>
      </div>

      {/* Kitap Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedBooks.map((book) => {
          const category = categories.find((c) => c.id === book.categoryId);
          const isAvailable = book.available > 0;

          return (
            <Link
              key={book.id}
              to={`/user/catalog/${book.id}`}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Kitap Kapağı Alanı */}
              <div className="h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center relative overflow-hidden">
                <BookOpen className="w-20 h-20 text-zinc-400 group-hover:scale-110 transition-transform" />
                {!isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
                      Stokta Yok
                    </span>
                  </div>
                )}
              </div>

              {/* Kitap Bilgileri */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-zinc-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                </div>
                
                <p className="text-sm text-zinc-600 mb-2">{book.author}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
                    {category?.name}
                  </span>
                  <span className="text-xs text-zinc-500">{book.publishYear}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm">4.5</span>
                  </div>
                  <span className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {isAvailable ? `${book.available} stokta` : 'Stokta yok'}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {sortedBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-xl text-zinc-900 mb-2">Kitap bulunamadı</h3>
          <p className="text-zinc-600">Farklı filtreler veya arama terimleri deneyin</p>
        </div>
      )}
    </div>
  );
}
