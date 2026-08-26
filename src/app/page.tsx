'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, DollarSign, Users, CheckCircle2, ArrowUpRight, Sparkles, Plus, Rocket, Megaphone, Calendar } from 'lucide-react';

export default function DashboardPage() {
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
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalMRR = products.reduce((acc, p) => acc + (p.monthlyRevenue || 0), 0);
  const totalUsers = products.reduce((acc, p) => acc + (p.totalUsers || 0), 0);
  const totalChecklists = products.reduce((acc, p) => acc + (p.checklistItems?.length || 0), 0);
  const completedChecklists = products.reduce((acc, p) => acc + (p.checklistItems?.filter((i: any) => i.isCompleted).length || 0), 0);

  const allCampaigns = products.flatMap((p) =>
    (p.campaigns || []).map((c: any) => ({ ...c, productName: p.name, productSlug: p.id }))
  );
  const upcomingCampaigns = allCampaigns.filter((c) => c.status !== 'PUBLISHED').slice(0, 5);

  const statusColors: Record<string, string> = {
    IDEA: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    BUILDING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    PRE_LAUNCH: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    LAUNCHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    SUNSET: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Overview of your software portfolio, marketing campaigns, and launch progress.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/marketing/generator"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            AI Copy Studio
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Products</span>
            <Package className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">{products.length}</div>
          <p className="text-xs text-slate-500 mt-2">Across all lifecycle stages</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Portfolio MRR</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">${totalMRR.toLocaleString()}</div>
          <p className="text-xs text-emerald-400/80 mt-2 font-medium">Monthly Recurring Revenue</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Active Users</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">{totalUsers.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-2">Aggregated customer base</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Launch Progress</span>
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">
            {totalChecklists > 0 ? Math.round((completedChecklists / totalChecklists) * 100) : 0}%
          </div>
          <p className="text-xs text-slate-500 mt-2">{completedChecklists} of {totalChecklists} tasks complete</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-sky-400" />
              Products Portfolio
            </h2>
            <Link href="/products" className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1">
              View All Products <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-800/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                      {product.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-full border ${statusColors[product.status] || 'bg-slate-800 text-slate-400'}`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    <span className="text-slate-500">MRR: </span>
                    <span className="font-semibold text-emerald-400">${product.monthlyRevenue}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Users: </span>
                    <span className="font-semibold text-slate-200">{product.totalUsers}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Marketing Calendar / Upcoming Posts (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-400" />
              Upcoming Campaigns
            </h2>
            <Link href="/marketing/generator" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
              Draft Post
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            {upcomingCampaigns.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No scheduled posts yet. Open Copy Studio to create one!
              </div>
            ) : (
              upcomingCampaigns.map((camp) => (
                <div key={camp.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-sky-400">{camp.productName}</span>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-indigo-500/10 text-indigo-300 font-medium">
                      {camp.channel}
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-slate-200 line-clamp-1">{camp.title}</h4>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {camp.status}
                    </span>
                    <Link href={`/products/${camp.productSlug}`} className="hover:text-slate-300">
                      View details →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
