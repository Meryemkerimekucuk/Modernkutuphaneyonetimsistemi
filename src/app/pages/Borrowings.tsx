import { useState } from 'react';
import { Link } from 'react-router';
import { borrowings, books, members } from '../data/mockData';
import { Search, Filter, Plus } from 'lucide-react';

export function Borrowings() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBorrowings = borrowings.filter(borrowing => {
    const book = books.find(b => b.id === borrowing.bookId);
    const member = members.find(m => m.id === borrowing.memberId);
    const matchesStatus = statusFilter === 'all' || borrowing.status === statusFilter;
    const matchesSearch =
      book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member?.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = borrowings.filter(b => b.status === 'borrowed').length;
  const overdueCount = borrowings.filter(b => b.status === 'overdue').length;
  const returnedCount = borrowings.filter(b => b.status === 'returned').length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl text-zinc-900 mb-1">Ödünç İşlemleri</h1>
          <p className="text-zinc-500">Tüm ödünç işlemlerini görüntüleyin ve yönetin</p>
        </div>
        <Link
          to="/borrowings/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Ödünç
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Kitap veya üye ara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="borrowed">Ödünçte</option>
            <option value="overdue">Gecikmiş</option>
            <option value="returned">İade Edildi</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">{borrowings.length}</div>
          <div className="text-sm text-zinc-500">Toplam İşlem</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-blue-600 mb-1">{activeCount}</div>
          <div className="text-sm text-zinc-500">Aktif Ödünç</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-red-600 mb-1">{overdueCount}</div>
          <div className="text-sm text-zinc-500">Gecikmiş</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-green-600 mb-1">{returnedCount}</div>
          <div className="text-sm text-zinc-500">İade Edildi</div>
        </div>
      </div>

      {/* Borrowings Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Kitap</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Üye</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Ödünç Tarihi</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Son Teslim</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">İade Tarihi</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Durum</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Ceza</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredBorrowings.map((borrowing) => {
                const book = books.find(b => b.id === borrowing.bookId);
                const member = members.find(m => m.id === borrowing.memberId);
                return (
                  <tr key={borrowing.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-900">{book?.title}</div>
                      <div className="text-xs text-zinc-500">{book?.author}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/members/${member?.id}`} className="hover:underline">
                        <div className="text-sm text-zinc-900">
                          {member?.firstName} {member?.lastName}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">{borrowing.borrowDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">{borrowing.dueDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">
                        {borrowing.returnDate || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        borrowing.status === 'borrowed' ? 'bg-blue-50 text-blue-700' :
                        borrowing.status === 'returned' ? 'bg-green-50 text-green-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {borrowing.status === 'borrowed' ? 'Ödünçte' :
                         borrowing.status === 'returned' ? 'İade Edildi' : 'Gecikmiş'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${borrowing.fineAmount > 0 ? 'text-red-600' : 'text-zinc-600'}`}>
                        {borrowing.fineAmount > 0 ? `₺${borrowing.fineAmount}` : '-'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBorrowings.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          Aramanıza uygun ödünç işlemi bulunamadı
        </div>
      )}
    </div>
  );
}
