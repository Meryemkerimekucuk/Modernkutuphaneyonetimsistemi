import { publishers } from '../data/mockData';
import { Building2, Edit, Trash2, Plus, Globe } from 'lucide-react';

export function Publishers() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl text-zinc-900 mb-1">Yayınevleri</h1>
          <p className="text-zinc-500">Yayınevlerini yönetin</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Yayınevi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {publishers.map((publisher) => (
          <div key={publisher.id} className="bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-900 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-lg text-zinc-900 mb-1">{publisher.name}</h3>
                  <p className="text-sm text-zinc-500">{publisher.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {publisher.website && (
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-zinc-400" />
                <a href={`https://${publisher.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  {publisher.website}
                </a>
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <span className="text-xs text-zinc-500">Kitap Sayısı</span>
              <span className="text-lg text-zinc-900">{publisher.bookCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
