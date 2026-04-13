import { useState } from 'react';
import { borrowings, books, members } from '../data/mockData';
import { Search, Check } from 'lucide-react';

export function Returns() {
  const [searchTerm, setSearchTerm] = useState('');

  const activeBorrowings = borrowings.filter(b => b.status === 'borrowed' || b.status === 'overdue');
  const filteredBorrowings = activeBorrowings.filter(borrowing => {
    const book = books.find(b => b.id === borrowing.bookId);
    const member = members.find(m => m.id === borrowing.memberId);
    return (
      book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleReturn = (id: string) => {
    console.log('Returning book with id:', id);
  };

  const calculateOverdueDays = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateFine = (overdueDays: number) => {
    return overdueDays * 5;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-zinc-900 mb-1">İade İşlemleri</h1>
        <p className="text-zinc-500">Ödünç alınan kitapları iade edin</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-6">
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">{activeBorrowings.length}</div>
          <div className="text-sm text-zinc-500">Aktif Ödünç</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-red-600 mb-1">
            {activeBorrowings.filter(b => b.status === 'overdue').length}
          </div>
          <div className="text-sm text-zinc-500">Gecikmiş İade</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">
            ₺{activeBorrowings.reduce((sum, b) => sum + b.fineAmount, 0)}
          </div>
          <div className="text-sm text-zinc-500">Toplam Ceza</div>
        </div>
      </div>

      {/* Returns List */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Kitap</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Üye</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Ödünç Tarihi</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Son Teslim</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Gecikme</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Ceza</th>
                <th className="text-right px-6 py-4 text-sm text-zinc-600">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredBorrowings.map((borrowing) => {
                const book = books.find(b => b.id === borrowing.bookId);
                const member = members.find(m => m.id === borrowing.memberId);
                const overdueDays = calculateOverdueDays(borrowing.dueDate);
                const fine = calculateFine(overdueDays);
                const isOverdue = borrowing.status === 'overdue';

                return (
                  <tr key={borrowing.id} className={`hover:bg-zinc-50 transition-colors ${isOverdue ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-900">{book?.title}</div>
                      <div className="text-xs text-zinc-500">{book?.author}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-900">
                        {member?.firstName} {member?.lastName}
                      </div>
                      <div className="text-xs text-zinc-500">{member?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">{borrowing.borrowDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${isOverdue ? 'text-red-600' : 'text-zinc-600'}`}>
                        {borrowing.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {overdueDays > 0 ? (
                        <div className="text-sm text-red-600">{overdueDays} gün</div>
                      ) : (
                        <div className="text-sm text-zinc-400">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {fine > 0 ? (
                        <div className="text-sm text-red-600">₺{fine}</div>
                      ) : (
                        <div className="text-sm text-zinc-400">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleReturn(borrowing.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <Check className="w-4 h-4" />
                          İade Al
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

      {filteredBorrowings.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          İade edilecek kitap bulunamadı
        </div>
      )}
    </div>
  );
}
