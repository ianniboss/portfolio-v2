import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "ian-admin-token";

const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const Login = ({ onLogin }) => {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    try {
      await axios.post(`${API}/admin/login`, { token });
      localStorage.setItem(TOKEN_KEY, token);
      onLogin(token);
    } catch (e) {
      setStatus("error");
      setErr(e?.response?.status === 401 ? "Invalid token." : "Could not reach server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        data-testid="admin-login-form"
        className="w-full max-w-md p-10 rounded-md border border-white/10 backdrop-blur-xl"
        style={{ background: "rgba(20, 24, 32, 0.7)" }}
      >
        <div className="eyebrow">/ Admin</div>
        <h1 className="font-display text-3xl md:text-4xl mt-3 tracking-tight text-[var(--text-primary)]">
          Inbox access
        </h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Enter your admin token to view incoming messages from the portfolio contact form.
        </p>

        <label className="block mt-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            Admin token
          </span>
          <input
            type="password"
            autoFocus
            required
            data-testid="admin-token-input"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[var(--amber)] outline-none py-2 text-base text-[var(--text-primary)]"
          />
        </label>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="submit"
            data-testid="admin-login-submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-3 bg-[var(--amber)] text-[#0D0D0D] px-6 py-2.5 rounded-full font-medium hover:bg-[#d9a35a] transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Checking…" : "Enter inbox"}
            <span>→</span>
          </button>
          <Link
            to="/"
            data-testid="admin-back-home"
            className="text-[12px] font-mono uppercase tracking-[0.3em] text-[var(--text-secondary)] hover:text-[var(--amber)] transition-colors"
          >
            ← Site
          </Link>
        </div>

        {err && (
          <p className="mt-4 font-mono text-[11px] text-[#e07a5f]" data-testid="admin-login-error">
            {err}
          </p>
        )}
      </form>
    </div>
  );
};

const Inbox = ({ token, onLogout }) => {
  const [messages, setMessages] = useState(null);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = useMemo(() => ({ "x-admin-token": token }), [token]);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const [m, s] = await Promise.all([
        axios.get(`${API}/admin/contact?limit=500`, { headers }),
        axios.get(`${API}/admin/stats`, { headers }),
      ]);
      setMessages(m.data);
      setStats(s.data);
      if (m.data.length && !selected) setSelected(m.data[0]);
    } catch (e) {
      if (e?.response?.status === 401) onLogout();
      setErr(e?.response?.data?.detail || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    try {
      await axios.delete(`${API}/admin/contact/${id}`, { headers });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
      // Refresh stats
      const s = await axios.get(`${API}/admin/stats`, { headers });
      setStats(s.data);
    } catch (e) {
      setErr(e?.response?.data?.detail || "Could not delete message");
    }
  };

  const filtered = useMemo(() => {
    if (!messages) return [];
    if (!filter.trim()) return messages;
    const f = filter.toLowerCase();
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(f) ||
        m.email.toLowerCase().includes(f) ||
        m.message.toLowerCase().includes(f)
    );
  }, [messages, filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 px-6 md:px-12 py-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-baseline gap-4">
          <Link
            to="/"
            data-testid="admin-logo"
            className="font-display text-lg text-[var(--text-primary)] flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "var(--amber)" }} />
            I.S.A
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--text-secondary)] ml-2">
              Admin · Inbox
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em]">
          {stats && (
            <div className="flex items-center gap-5 text-[var(--text-secondary)]" data-testid="admin-stats">
              <span>
                <span className="text-[var(--text-primary)] mr-1">{stats.total}</span>total
              </span>
              <span>
                <span className="text-[var(--amber)] mr-1">{stats.last_24h}</span>24h
              </span>
              <span>
                <span className="text-[var(--teal)] mr-1">{stats.last_7d}</span>7d
              </span>
            </div>
          )}
          <button
            onClick={load}
            data-testid="admin-refresh"
            className="text-[var(--text-secondary)] hover:text-[var(--amber)] transition-colors"
          >
            ↻ Refresh
          </button>
          <button
            onClick={onLogout}
            data-testid="admin-logout"
            className="text-[var(--text-secondary)] hover:text-[#e07a5f] transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[380px_1fr]">
        {/* List */}
        <aside className="border-r border-white/10 max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="p-4 sticky top-0 bg-[var(--bg-base)]/95 backdrop-blur z-10 border-b border-white/5">
            <input
              type="search"
              placeholder="Search by name, email, content…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              data-testid="admin-search"
              className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--amber)]"
            />
          </div>

          {loading && !messages && (
            <p className="px-4 py-6 text-[var(--text-secondary)] text-sm">Loading…</p>
          )}
          {err && (
            <p className="px-4 py-6 text-[#e07a5f] text-sm" data-testid="admin-error">
              {err}
            </p>
          )}
          {messages && filtered.length === 0 && (
            <p className="px-4 py-8 text-[var(--text-secondary)] text-sm" data-testid="admin-empty">
              No messages yet.
            </p>
          )}

          <ul data-testid="admin-message-list">
            <AnimatePresence initial={false}>
              {filtered.map((m) => {
                const active = selected?.id === m.id;
                return (
                  <motion.li
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(m)}
                      data-testid={`admin-item-${m.id}`}
                      className={`w-full text-left px-4 py-4 border-b border-white/[0.05] transition-colors ${
                        active ? "bg-[var(--surface-card)]" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-base text-[var(--text-primary)] truncate">
                          {m.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] shrink-0">
                          {m.locale?.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-[var(--amber)] mt-1 truncate">
                        {m.email}
                      </div>
                      <div className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
                        {m.message}
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                        {fmtDate(m.created_at)}
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </aside>

        {/* Detail */}
        <main className="p-8 md:p-12">
          {!selected ? (
            <div className="text-[var(--text-secondary)] font-mono text-sm">
              Select a message on the left to view it.
            </div>
          ) : (
            <article data-testid="admin-detail">
              <div className="eyebrow">/ Message</div>
              <h2 className="font-display text-3xl md:text-4xl mt-3 text-[var(--text-primary)]">
                {selected.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] text-[var(--text-secondary)]">
                <a
                  href={`mailto:${selected.email}?subject=Re: your message via portfolio`}
                  className="text-[var(--amber)] hover:underline"
                  data-testid="admin-reply"
                >
                  ↗ {selected.email}
                </a>
                <span>{fmtDate(selected.created_at)}</span>
                <span className="uppercase tracking-[0.2em]">locale: {selected.locale}</span>
              </div>

              <div className="mt-8 max-w-3xl bg-[var(--surface-card)] border border-white/10 rounded-sm p-8 whitespace-pre-wrap leading-relaxed text-[var(--text-primary)]">
                {selected.message}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: your message via portfolio`}
                  className="inline-flex items-center gap-3 bg-[var(--amber)] text-[#0D0D0D] px-6 py-2.5 rounded-full font-medium hover:bg-[#d9a35a] transition-colors"
                >
                  Reply <span>→</span>
                </a>
                <button
                  type="button"
                  onClick={() => onDelete(selected.id)}
                  data-testid="admin-delete"
                  className="inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 rounded-full text-[var(--text-secondary)] hover:text-[#e07a5f] hover:border-[#e07a5f] transition-colors"
                >
                  Delete
                </button>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
};

const Admin = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");

  // Verify cached token is still valid
  useEffect(() => {
    if (!token) return;
    axios
      .post(`${API}/admin/login`, { token })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      });
  }, [token]);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
  };

  return (
    <div className="App relative" data-testid="admin-page">
      {token ? <Inbox token={token} onLogout={logout} /> : <Login onLogin={setToken} />}
    </div>
  );
};

export default Admin;
