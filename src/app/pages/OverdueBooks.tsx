import { borrowings, books, members } from '../data/mockData';
import { Link } from 'react-router';
import { AlertCircle, Mail, Phone } from 'lucide-react';

export function OverdueBooks() {
  const overdueBorrowings = borrowings.filter(b => b.status === 'overdue');

  const calculateOverdueDays = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalFines = overdueBorrowings.reduce((sum, b) => sum + b.fineAmount, 0);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl text-zinc-900">Geç İadeler</h1>
        </div>
        <p className="text-zinc-500">Süresi geçmiş ödünç kitaplar ve ceza takibi</p>
      </div>

      {/* Warning Banner */}
      {overdueBorrowings.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-red-900 mb-1">Dikkat</h3>
              <p className="text-sm text-red-700">
                {overdueBorrowings.length} adet gecikmiş kitap iadesi bulunmaktadır.
                Toplam ceza tutarı: ₺{totalFines}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-red-600 mb-1">{overdueBorrowings.length}</div>
          <div className="text-sm text-zinc-500">Gecikmiş İade</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">
            {new Set(overdueBorrowings.map(b => b.memberId)).size}
          </div>
          <div className="text-sm text-zinc-500">Borçlu Üye</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="text-2xl text-zinc-900 mb-1">₺{totalFines}</div>
          <div className="text-sm text-zinc-500">Toplam Ceza</div>
        </div>
      </div>

      {/* Overdue List */}
      <div className="space-y-4">
        {overdueBorrowings.map((borrowing) => {
          const book = books.find(b => b.id === borrowing.bookId);
          const member = members.find(m => m.id === borrowing.memberId);
          const overdueDays = calculateOverdueDays(borrowing.dueDate);

          return (
            <div key={borrowing.id} className="bg-white border border-red-200 rounded-xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Book & Member Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-zinc-900 mb-1">{book?.title}</h3>
                      <p className="text-sm text-zinc-600 mb-3">{book?.author}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Üye</div>
                          <Link to={`/members/${member?.id}`} className="text-sm text-zinc-900 hover:underline">
                            {member?.firstName} {member?.lastName}
                          </Link>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Ödünç Tarihi</div>
                          <div className="text-sm text-zinc-900">{borrowing.borrowDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Son Teslim Tarihi</div>
                          <div className="text-sm text-red-600">{borrowing.dueDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Gecikme Süresi</div>
                          <div className="text-sm text-red-600 font-medium">{overdueDays} gün</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t lg:border-t-0 lg:border-l border-zinc-100 pt-4 lg:pt-0 lg:pl-6">
                  <div className="mb-4">
                    <div className="text-xs text-zinc-500 mb-1">Toplam Ceza</div>
                    <div className="text-2xl text-red-600 mb-2">₺{borrowing.fineAmount}</div>
                    <div className="text-xs text-zinc-500">Günlük ₺5</div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${member?.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm justify-center"
                    >
                      <Mail className="w-4 h-4" />
                      Email Gönder
                    </a>
                    <a
                      href={`tel:${member?.phone}`}
                      className="flex items-center gap-2 px-4 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors text-sm justify-center"
                    >
                      <Phone className="w-4 h-4" />
                      Ara
                    </a>
                    <Link
                      to="/returns"
                      className="block px-4 py-2 border border-zinc-200 text-zinc-900 rounded-lg hover:border-zinc-900 transition-colors text-sm text-center"
                    >
                      İade Al
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {overdueBorrowings.length === 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg text-zinc-900 mb-2">Harika! Gecikmiş İade Yok</h3>
          <p className="text-zinc-500">Şu anda gecikmiş kitap iadesi bulunmamaktadır.</p>
        </div>
      )}
    </div>
  );
}
