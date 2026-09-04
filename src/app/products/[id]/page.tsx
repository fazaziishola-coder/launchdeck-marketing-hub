'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Package, CheckSquare, Megaphone, Globe, BarChart2, Settings, ExternalLink, Github,
  Plus, CheckCircle2, Circle, Sparkles, Trash2, ArrowLeft, TrendingUp, Users, DollarSign
} from 'lucide-react';

export default function ProductDetailHub() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'checklist' | 'campaigns' | 'directories' | 'metrics' | 'settings'>('checklist');

  // New task form state
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskStage, setNewTaskStage] = useState('PRE_LAUNCH');
  const [newTaskCategory, setNewTaskCategory] = useState('General');

  // New campaign state
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignChannel, setNewCampaignChannel] = useState('TWITTER');
  const [newCampaignContent, setNewCampaignContent] = useState('');

  // Metric Log State
  const [newVisitors, setNewVisitors] = useState('');
  const [newSignups, setNewSignups] = useState('');
  const [newMRR, setNewMRR] = useState('');
  const [metricNote, setMetricNote] = useState('');

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        router.push('/products');
        return;
      }
      const data = await res.json();
      setProduct(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  const toggleChecklist = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/checklist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });
      fetchProductDetails();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText) return;
    try {
      await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          task: newTaskText,
          stage: newTaskStage,
          category: newTaskCategory,
        }),
      });
      setNewTaskText('');
      fetchProductDetails();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignTitle || !newCampaignContent) return;
    try {
      await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          title: newCampaignTitle,
          channel: newCampaignChannel,
          content: newCampaignContent,
          status: 'DRAFT',
        }),
      });
      setNewCampaignTitle('');
      setNewCampaignContent('');
      fetchProductDetails();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateDirectoryStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/directories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchProductDetails();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          visitors: Number(newVisitors) || 0,
          signups: Number(newSignups) || 0,
          mrr: Number(newMRR) || 0,
          notes: metricNote,
        }),
      });
      setNewVisitors('');
      setNewSignups('');
      setNewMRR('');
      setMetricNote('');
      fetchProductDetails();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchProductDetails();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      router.push('/products');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-400 border-t-transparent"></div>
      </div>
    );
  }

  const completedTasks = product.checklistItems?.filter((i: any) => i.isCompleted).length || 0;
  const totalTasks = product.checklistItems?.length || 0;
  const launchProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statusColors: Record<string, string> = {
    IDEA: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    BUILDING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    PRE_LAUNCH: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    LAUNCHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    SUNSET: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link href="/products" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products Portfolio
      </Link>

      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-100">{product.name}</h1>
              <select
                value={product.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border bg-slate-950 text-slate-200 focus:outline-none cursor-pointer ${statusColors[product.status]}`}
              >
                <option value="IDEA">IDEA</option>
                <option value="BUILDING">BUILDING</option>
                <option value="PRE_LAUNCH">PRE_LAUNCH</option>
                <option value="LAUNCHED">LAUNCHED</option>
                <option value="SUNSET">SUNSET</option>
              </select>
            </div>
            <p className="text-sm text-slate-400 mt-1">{product.tagline}</p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-500 uppercase block">MRR</span>
              <span className="text-sm font-bold text-emerald-400">${product.monthlyRevenue}</span>
            </div>
            <div className="w-px h-6 bg-slate-800"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-500 uppercase block">Active Users</span>
              <span className="text-sm font-bold text-slate-200">{product.totalUsers}</span>
            </div>
            <div className="w-px h-6 bg-slate-800"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-500 uppercase block">Launch Prep</span>
              <span className="text-sm font-bold text-sky-400">{launchProgress}%</span>
            </div>
          </div>
        </div>

        {/* Links & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            {product.websiteUrl && (
              <a href={product.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-sky-400">
                <Globe className="w-3.5 h-3.5 text-sky-400" /> Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {product.repoUrl && (
              <a href={product.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-sky-400">
                <Github className="w-3.5 h-3.5 text-slate-400" /> Repository <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {product.techStack && (
              <span className="text-slate-500">Tech: <strong className="text-slate-300 font-normal">{product.techStack}</strong></span>
            )}
          </div>
          <Link
            href={`/marketing/generator?productId=${product.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate Post Copy
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
        {[
          { id: 'checklist', label: `Launch Checklist (${completedTasks}/${totalTasks})`, icon: CheckSquare },
          { id: 'campaigns', label: `Marketing Posts (${product.campaigns?.length || 0})`, icon: Megaphone },
          { id: 'directories', label: `Directories (${product.directorySubmissions?.length || 0})`, icon: Globe },
          { id: 'metrics', label: 'Growth & Metrics', icon: BarChart2 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-sky-500 text-sky-400 bg-sky-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {/* Add custom task */}
          <form onSubmit={handleAddChecklist} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Add a custom launch task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
            <select
              value={newTaskStage}
              onChange={(e) => setNewTaskStage(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
            >
              <option value="PRE_LAUNCH">Pre-Launch</option>
              <option value="LAUNCH_DAY">Launch Day</option>
              <option value="POST_LAUNCH">Post-Launch</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Task
            </button>
          </form>

          {/* Checklist Sections */}
          {['PRE_LAUNCH', 'LAUNCH_DAY', 'POST_LAUNCH'].map((stage) => {
            const stageTasks = product.checklistItems?.filter((item: any) => item.stage === stage) || [];
            const stageName = stage === 'PRE_LAUNCH' ? 'Pre-Launch Preparation' : stage === 'LAUNCH_DAY' ? 'Launch Day Blitz' : 'Post-Launch Distribution & Growth';

            return (
              <div key={stage} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-sky-400 flex items-center justify-between">
                  <span>{stageName}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {stageTasks.filter((t: any) => t.isCompleted).length} / {stageTasks.length} done
                  </span>
                </h3>

                <div className="space-y-2">
                  {stageTasks.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id, item.isCompleted)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        item.isCompleted
                          ? 'bg-slate-950/40 border-slate-800/50 text-slate-500 line-through'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 text-xs">
                        <span className="font-semibold text-slate-400 mr-2">[{item.category}]</span>
                        <span>{item.task}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Create campaign form */}
          <form onSubmit={handleCreateCampaign} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Draft New Marketing Post / Campaign</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Campaign Title (e.g. X Launch Thread, Show HN)"
                value={newCampaignTitle}
                onChange={(e) => setNewCampaignTitle(e.target.value)}
                className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
              <select
                value={newCampaignChannel}
                onChange={(e) => setNewCampaignChannel(e.target.value)}
                className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
              >
                <option value="TWITTER">X / Twitter</option>
                <option value="REDDIT">Reddit</option>
                <option value="PRODUCT_HUNT">Product Hunt</option>
                <option value="HACKER_NEWS">Hacker News</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="NEWSLETTER">Newsletter</option>
                <option value="COLD_EMAIL">Cold Email</option>
              </select>
            </div>
            <textarea
              rows={4}
              required
              placeholder="Paste or write marketing copy..."
              value={newCampaignContent}
              onChange={(e) => setNewCampaignContent(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
            />
            <div className="flex justify-end gap-3">
              <Link
                href={`/marketing/generator?productId=${product.id}`}
                className="px-4 py-2 bg-indigo-600/20 text-indigo-300 text-xs font-medium rounded-lg hover:bg-indigo-600/30 border border-indigo-500/30 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Copy Assistant
              </Link>
              <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-lg">
                Save Campaign Post
              </button>
            </div>
          </form>

          {/* Posts List */}
          <div className="space-y-4">
            {product.campaigns?.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500">
                No marketing posts saved yet. Draft your launch thread or announcement above!
              </div>
            ) : (
              product.campaigns?.map((camp: any) => (
                <div key={camp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {camp.channel}
                      </span>
                      <h4 className="font-bold text-sm text-slate-200">{camp.title}</h4>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">{camp.status}</span>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                    {camp.content}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Directories */}
      {activeTab === 'directories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span>Track submissions across high-domain-authority directories for launch exposure & SEO backlinks.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.directorySubmissions?.map((dir: any) => (
              <div key={dir.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">{dir.directoryName}</h4>
                    <a href={dir.directoryUrl} target="_blank" rel="noreferrer" className="text-[11px] text-sky-400 hover:underline flex items-center gap-1">
                      Visit Directory <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    DR: {dir.domainRating}
                  </span>
                </div>

                <div className="text-xs text-slate-400 line-clamp-2">{dir.notes}</div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase">Status</span>
                  <select
                    value={dir.status}
                    onChange={(e) => handleUpdateDirectoryStatus(dir.id, e.target.value)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-950 text-slate-200 border border-slate-800 focus:outline-none"
                  >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="APPROVED">Approved / Live</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Metrics */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Record metric form */}
          <form onSubmit={handleAddMetrics} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Log Growth Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Monthly Visitors</label>
                <input
                  type="number"
                  placeholder="e.g. 1200"
                  value={newVisitors}
                  onChange={(e) => setNewVisitors(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Total Registered Users</label>
                <input
                  type="number"
                  placeholder="e.g. 350"
                  value={newSignups}
                  onChange={(e) => setNewSignups(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Monthly Revenue ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 480"
                  value={newMRR}
                  onChange={(e) => setNewMRR(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Milestone note (e.g. PH Launch Day spike)..."
              value={metricNote}
              onChange={(e) => setMetricNote(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg">
              Record Growth Metric
            </button>
          </form>

          {/* Historical Log */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200">Historical Metric Logs</h3>
            <div className="divide-y divide-slate-800">
              {product.metricLogs?.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">No metric snapshots logged yet.</div>
              ) : (
                product.metricLogs?.map((log: any) => (
                  <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">
                        {new Date(log.date).toLocaleDateString()}
                      </span>
                      {log.notes && <span className="text-slate-500 ml-2">({log.notes})</span>}
                    </div>
                    <div className="flex gap-4">
                      <span>Visitors: <strong className="text-slate-200">{log.visitors}</strong></span>
                      <span>Users: <strong className="text-indigo-400">{log.signups}</strong></span>
                      <span>MRR: <strong className="text-emerald-400">${log.mrr}</strong></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Settings */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-200">Product Settings</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Product Description</label>
              <p className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">{product.description || 'No description provided.'}</p>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Target Audience</label>
              <p className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">{product.targetAudience || 'Not specified.'}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-red-400 font-medium">Danger Zone</span>
            <button
              onClick={handleDeleteProduct}
              className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
