'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Award, Rocket, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      });
  }, []);

  const totalMRR = products.reduce((acc, p) => acc + (p.monthlyRevenue || 0), 0);
  const totalUsers = products.reduce((acc, p) => acc + (p.totalUsers || 0), 0);
  const totalCampaigns = products.reduce((acc, p) => acc + (p.campaigns?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-emerald-400" /> Portfolio Growth Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Track aggregate revenue, user acquisition, and launch performance across your software portfolio.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Monthly Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">${totalMRR.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-2">Combined MRR across active products</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Registered Users</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{totalUsers.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-2">Aggregated active user count</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Marketing Campaigns</span>
            <Award className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{totalCampaigns}</div>
          <p className="text-xs text-slate-500 mt-2">Saved posts & announcements</p>
        </div>
      </div>

      {/* Product Breakdown Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-100">Product Revenue & User Breakdown</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Pricing Model</th>
                <th className="py-3 px-4 text-right">Users</th>
                <th className="py-3 px-4 text-right">Monthly Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-200">{p.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-800 text-slate-300">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{p.pricingModel || 'Freemium'}</td>
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-200">{p.totalUsers}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-emerald-400">${p.monthlyRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
