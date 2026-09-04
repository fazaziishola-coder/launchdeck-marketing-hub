'use client';

import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function ContentCalendarPage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'MONTH' | 'WEEK' | 'LIST'>('MONTH');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await fetch('/api/calendar');
      const data = await res.json();
      if (Array.isArray(data.schedules)) setSchedules(data.schedules);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-sky-400" /> Content Calendar
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Schedule, manage, and review publication timelines across all your marketing channels.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(['MONTH', 'WEEK', 'LIST'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === mode
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid View */}
      {viewMode === 'MONTH' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 border-b border-slate-800 pb-3">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvents = dayNum % 3 === 0;

              return (
                <div
                  key={i}
                  className="min-h-[100px] p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-400">{dayNum}</span>

                  {hasEvents && (
                    <div className="p-1.5 rounded bg-sky-500/10 border border-sky-500/20 text-[10px] text-sky-300 font-medium truncate">
                      LinkedIn Post #{dayNum}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'LIST' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100">Scheduled & Draft Content Pipeline</h2>
          <div className="divide-y divide-slate-800">
            {schedules.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No items scheduled yet. Go to Content Studio or Campaigns to schedule posts!
              </div>
            ) : (
              schedules.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-200">{item.content?.title || 'Scheduled Item'}</span>
                    <span className="text-slate-500 ml-2">({item.platform})</span>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300">
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
