import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { books, members } from '../data/mockData';
import { ArrowLeft, Save, Search } from 'lucide-react';

export function BorrowBook() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [daysCount, setDaysCount] = useState(14);
  const [bookSearch, setBookSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');

  const availableBooks = books.filter(b => b.available > 0);
  const filteredBooks = availableBooks.filter(b =>
    b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const activeMembers = members.filter(m => m.status === 'active');
  const filteredMembers = activeMembers.filter(m =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook || !selectedMember) {
      alert('Lütfen kitap ve üye seçiniz');
      return;
    }
    console.log('New borrowing:', { selectedBook, selectedMember, daysCount });
    navigate('/borrowings');
  };

  const selectedBookData = books.find(b => b.id === selectedBook);
  const selectedMemberData = members.find(m => m.id === selectedMember);

  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + daysCount);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/borrowings"
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl text-zinc-900 mb-1">Yeni Ödünç İşlemi</h1>
          <p className="text-zinc-500">Kitap ödünç verme işlemi başlatın</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Book Selection */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-lg text-zinc-900 mb-4">Kitap Seçimi</h2>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Kitap ara"
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredBooks.map(book => (
                <label
                  key={book.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedBook === book.id
                      ? 'border-zinc-900 bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="book"
                    value={book.id}
                    checked={selectedBook === book.id}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-zinc-900">{book.title}</div>
                    <div className="text-xs text-zinc-500">{book.author}</div>
                  </div>
                  <div className="text-xs text-green-600">
                    {book.available} mevcut
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Member Selection */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-lg text-zinc-900 mb-4">Üye Seçimi</h2>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Üye ara"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredMembers.map(member => (
                <label
                  key={member.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMember === member.id
                      ? 'border-zinc-900 bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="member"
                    value={member.id}
                    checked={selectedMember === member.id}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">
                      {member.firstName[0]}{member.lastName[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-zinc-900">
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="text-xs text-zinc-500">{member.email}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-lg text-zinc-900 mb-4">Ödünç Süresi</h2>
            <div>
              <label className="block text-sm text-zinc-700 mb-2">Gün Sayısı</label>
              <input
                type="number"
                value={daysCount}
                onChange={(e) => setDaysCount(parseInt(e.target.value))}
                min="1"
                max="90"
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Öğrenci ve öğretmenler için maksimum 30 gün, genel üyeler için 14 gün
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!selectedBook || !selectedMember}
              className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Ödünç Ver
            </button>
            <Link
              to="/borrowings"
              className="px-6 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors"
            >
              İptal
            </Link>
          </div>
        </form>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h3 className="text-lg text-zinc-900 mb-4">İşlem Özeti</h3>
            <div className="space-y-4">
              {selectedBookData ? (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Seçilen Kitap</div>
                  <div className="text-sm text-zinc-900 mb-1">{selectedBookData.title}</div>
                  <div className="text-xs text-zinc-500">{selectedBookData.author}</div>
                </div>
              ) : (
                <div className="text-sm text-zinc-400">Henüz kitap seçilmedi</div>
              )}

              {selectedMemberData ? (
                <div className="pt-4 border-t border-zinc-100">
                  <div className="text-xs text-zinc-500 mb-1">Seçilen Üye</div>
                  <div className="text-sm text-zinc-900 mb-1">
                    {selectedMemberData.firstName} {selectedMemberData.lastName}
                  </div>
                  <div className="text-xs text-zinc-500">{selectedMemberData.email}</div>
                </div>
              ) : (
                <div className="text-sm text-zinc-400 pt-4 border-t border-zinc-100">
                  Henüz üye seçilmedi
                </div>
              )}

              <div className="pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Ödünç Tarihi</span>
                  <span className="text-sm text-zinc-900">{today.toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Son Teslim Tarihi</span>
                  <span className="text-sm text-zinc-900">{dueDate.toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
