'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Plus, Search, Filter, Globe, Github, Layers, ArrowUpRight, DollarSign, Users, X } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    tagline: '',
    description: '',
    status: 'BUILDING',
    websiteUrl: '',
    repoUrl: '',
    techStack: '',
    targetAudience: '',
    pricingModel: 'Freemium',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.tagline) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewProduct({
          name: '',
          tagline: '',
          description: '',
          status: 'BUILDING',
          websiteUrl: '',
          repoUrl: '',
          techStack: '',
          targetAudience: '',
          pricingModel: 'Freemium',
        });
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.techStack && p.techStack.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const statusColors: Record<string, string> = {
    IDEA: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    BUILDING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    PRE_LAUNCH: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    LAUNCHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    SUNSET: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Products Portfolio</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and track your products across all stages of development and marketing.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name, tagline, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-500 ml-1 mr-1" />
          {['ALL', 'BUILDING', 'PRE_LAUNCH', 'LAUNCHED', 'IDEA', 'SUNSET'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                filterStatus === st
                  ? 'bg-sky-600 text-white border-sky-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No products found</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">Get started by creating your first product tracking workspace.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-lg shadow transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const completedTasks = product.checklistItems?.filter((i: any) => i.isCompleted).length || 0;
            const totalTasks = product.checklistItems?.length || 0;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-200 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                      <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-full border ${statusColors[product.status] || 'bg-slate-800 text-slate-400'}`}>
                      {product.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
                    {product.tagline}
                  </p>

                  {product.techStack && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-4 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80">
                      <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{product.techStack}</span>
                    </div>
                  )}

                  {/* Launch Progress bar */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Launch Preparation</span>
                      <span className="text-sky-400 font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">MRR</span>
                      <span className="font-bold text-emerald-400">${product.monthlyRevenue}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Users</span>
                      <span className="font-bold text-slate-200">{product.totalUsers}</span>
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Open Hub <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-xl shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-100 mb-1">Create New Product</h2>
            <p className="text-xs text-slate-400 mb-6">Initialize a marketing and tracking workspace for your new product.</p>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FormFlow AI"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">One-Line Tagline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-converting conversational form builder"
                  value={newProduct.tagline}
                  onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Lifecycle Stage</label>
                  <select
                    value={newProduct.status}
                    onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  >
                    <option value="IDEA">Idea</option>
                    <option value="BUILDING">Building</option>
                    <option value="PRE_LAUNCH">Pre-Launch</option>
                    <option value="LAUNCHED">Launched</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Pricing Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Freemium, One-time $29, Paid SaaS"
                    value={newProduct.pricingModel}
                    onChange={(e) => setNewProduct({ ...newProduct, pricingModel: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what the product does and why users need it..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tech Stack</label>
                  <input
                    type="text"
                    placeholder="Next.js, Tailwind, SQLite"
                    value={newProduct.techStack}
                    onChange={(e) => setNewProduct({ ...newProduct, techStack: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Audience</label>
                  <input
                    type="text"
                    placeholder="Indie Hackers, Marketers"
                    value={newProduct.targetAudience}
                    onChange={(e) => setNewProduct({ ...newProduct, targetAudience: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProduct.websiteUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GitHub / Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newProduct.repoUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, repoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg text-sm bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-600/20"
                >
                  {submitting ? 'Creating...' : 'Create Workspace'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
