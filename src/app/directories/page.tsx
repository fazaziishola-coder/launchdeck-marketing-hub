'use client';

import { useEffect, useState } from 'react';
import { Globe, ExternalLink, CheckCircle2, Clock, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { DEFAULT_DIRECTORIES } from '@/lib/initialData';

export default function DirectoriesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setSelectedProductId(data[0].id);
        }
        setLoading(false);
      });
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleUpdateStatus = async (subId: string, newStatus: string) => {
    try {
      await fetch(`/api/directories/${subId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      // Refresh products
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Globe className="w-7 h-7 text-sky-400" /> Universal Startup Directory Index
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Master list of high-DR directories and platforms to launch your products and build SEO backlinks.
          </p>
        </div>

        {/* Product selector */}
        {products.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Filter Product:</span>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Directory Table / Cards */}
      <div className="space-y-4">
        {DEFAULT_DIRECTORIES.map((dir) => {
          const submission = selectedProduct?.directorySubmissions?.find(
            (s: any) => s.directoryName.toLowerCase() === dir.directoryName.toLowerCase()
          );

          return (
            <div
              key={dir.directoryName}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-base text-slate-100">{dir.directoryName}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-sky-400 border border-slate-700">
                    DR: {dir.domainRating}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{dir.notes}</p>
                <a
                  href={dir.directoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:underline pt-1"
                >
                  Visit Platform <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Status Manager for selected product */}
              {submission && (
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800/80 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Submission Status</span>
                    <span className="text-xs font-semibold text-slate-300">{submission.status}</span>
                  </div>
                  <select
                    value={submission.status}
                    onChange={(e) => handleUpdateStatus(submission.id, e.target.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-slate-200 border border-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="APPROVED">Approved / Live</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
