import { authors } from '../data/mockData';
import { UserPen, Edit, Trash2, Plus } from 'lucide-react';

export function Authors() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl text-zinc-900 mb-1">Yazarlar</h1>
          <p className="text-zinc-500">Kitap yazarlarını yönetin</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Yazar
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Yazar</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Uyruk</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Doğum Yılı</th>
                <th className="text-left px-6 py-4 text-sm text-zinc-600">Kitap Sayısı</th>
                <th className="text-right px-6 py-4 text-sm text-zinc-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {authors.map((author) => (
                <tr key={author.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                        <UserPen className="w-5 h-5 text-zinc-600" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-900 mb-1">{author.name}</div>
                        {author.biography && (
                          <div className="text-xs text-zinc-500">{author.biography.substring(0, 50)}...</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-600">{author.nationality}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-600">{author.birthYear}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-900">{author.bookCount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
