"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ADMIN_USERS,
  BAN_USER,
  UNBAN_USER,
  DELETE_USER,
} from "@/graphql/queries/admin.queries";
import { AdminUsersResponse, AdminUser } from "@/app/types/type";
import AdminSearchBar from "@/app/components/admin/AdminSearchBar";
import AdminPagination from "@/app/components/admin/AdminPagination";
import toast from "react-hot-toast";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const ROLE_BADGE: Record<string, string> = {
  customer: "bg-blue-100   text-blue-700",
  restaurant: "bg-orange-100 text-orange-700",
  rider: "bg-purple-100 text-purple-700",
  logistics: "bg-indigo-100 text-indigo-700",
  admin: "bg-red-100    text-red-700",
};

const ROLE_ICON: Record<string, string> = {
  customer: "👤",
  restaurant: "🍽️",
  rider: "🛵",
  logistics: "🏢",
  admin: "🔑",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const formatLastSeen = (lastSeen?: string | null): string => {
  if (!lastSeen || lastSeen === "0" || lastSeen === "null") return "Never";

  const ts = Number(lastSeen);
  if (isNaN(ts) || ts === 0) return "Never";

  const created = new Date(ts);
  if (isNaN(created.getTime())) return "Never";

  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  if (diffMs < 0) return "Just now";

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;

  return created.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: created.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const formatJoined = (createdAt: string): string => {
  const ts = Number(createdAt);
  if (isNaN(ts)) return "—";
  return new Date(ts).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─── PRESENCE BADGE ──────────────────────────────────────────────────────────

function PresenceBadge({
  isOnline,
  lastSeen,
}: {
  isOnline: boolean;
  lastSeen?: string | null;
}) {
  if (isOnline) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Online
      </span>
    );
  }

  const lastSeenText = formatLastSeen(lastSeen);

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      {lastSeenText === "Never" ? "Never online" : `Last seen ${lastSeenText}`}
    </span>
  );
}

// ─── USER CARD ───────────────────────────────────────────────────────────────

function UserCard({
  user,
  onAction,
}: {
  user: AdminUser;
  onAction: (type: "ban" | "unban" | "delete", userId: string) => void;
}) {
  const isBanned = user.status === "suspended";

  return (
    <div
      className={`border rounded-2xl p-4 bg-white transition ${
        isBanned ? "border-red-100 bg-red-50/30" : "border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* LEFT — Avatar + Info */}
        <div className="flex items-start gap-3 min-w-0">
          {/* Avatar with online dot */}
          <div className="relative shrink-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white ${
                isBanned
                  ? "bg-gray-400"
                  : "bg-gradient-to-br from-[#E95322] to-orange-400"
              }`}
            >
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            {/* Online dot on avatar */}
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                user.isOnline ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Text info */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-semibold text-sm text-[#391713] truncate">
                {user.fullName}
              </p>
              {isBanned && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">
                  Banned
                </span>
              )}
            </div>

            {/* Role badge */}
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize flex items-center gap-0.5 ${
                  ROLE_BADGE[user.role] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {ROLE_ICON[user.role]} {user.role}
              </span>
            </div>

            {/* Contact */}
            {user.email && (
              <p className="text-xs text-gray-500 mt-1 truncate">
                {user.email}
              </p>
            )}
            {user.phone && (
              <p className="text-xs text-gray-400">{user.phone}</p>
            )}

            {/* Presence + Joined */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <PresenceBadge
                isOnline={user.isOnline}
                lastSeen={user.lastSeen}
              />
              <span className="text-[10px] text-gray-400">
                Joined {formatJoined(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex flex-col gap-1.5 shrink-0">
          {isBanned ? (
            <button
              onClick={() => onAction("unban", user.id)}
              className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition whitespace-nowrap"
            >
              ✓ Unban
            </button>
          ) : (
            <button
              onClick={() => onAction("ban", user.id)}
              className="text-xs px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold hover:bg-yellow-200 transition whitespace-nowrap"
            >
              ⛔ Ban
            </button>
          )}
          <button
            onClick={() => onAction("delete", user.id)}
            className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition whitespace-nowrap"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CONFIRM MODAL ───────────────────────────────────────────────────────────

function ConfirmModal({
  type,
  onConfirm,
  onCancel,
  loading,
}: {
  type: "ban" | "unban" | "delete";
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const meta = {
    ban: {
      title: "Ban User",
      color: "bg-yellow-600 hover:bg-yellow-700",
      label: "Ban User",
    },
    unban: {
      title: "Unban User",
      color: "bg-green-600  hover:bg-green-700",
      label: "Unban User",
    },
    delete: {
      title: "Delete User",
      color: "bg-red-600    hover:bg-red-700",
      label: "Delete User",
    },
  }[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
        <h3 className="font-bold text-[#391713] mb-2">{meta.title}</h3>
        <p className="text-sm text-gray-500 mb-5">
          {type === "delete"
            ? "This action is permanent and cannot be undone. All user data will be removed."
            : type === "ban"
              ? "The user will be suspended and unable to access the platform."
              : "The user's account will be restored and they can log in again."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border rounded-xl py-2 text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-white rounded-xl py-2 text-sm font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2 ${meta.color}`}
          >
            {loading && (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Processing..." : meta.label}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SUMMARY BAR ─────────────────────────────────────────────────────────────

function SummaryBar({ users }: { users: AdminUser[] }) {
  const online = users.filter((u) => u.isOnline).length;
  const banned = users.filter((u) => u.status === "suspended").length;
  const byRole = users.reduce(
    (acc, u) => {
      acc[u.role] = (acc[u.role] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {online > 0 && (
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {online} online
        </span>
      )}
      {banned > 0 && (
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-red-100 text-red-600 font-semibold">
          ⛔ {banned} banned
        </span>
      )}
      {Object.entries(byRole).map(([role, count]) => (
        <span
          key={role}
          className={`text-[11px] px-2.5 py-1 rounded-full font-semibold capitalize ${
            ROLE_BADGE[role] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {ROLE_ICON[role]} {count} {role}
          {count > 1 ? "s" : ""}
        </span>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [confirming, setConfirming] = useState<{
    type: "ban" | "unban" | "delete";
    userId: string;
  } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, loading, refetch } = useQuery<AdminUsersResponse>(
    GET_ADMIN_USERS,
    {
      variables: {
        page,
        limit: 20,
        search: debounced || null,
        role: roleFilter || null,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  const [banUser] = useMutation(BAN_USER);
  const [unbanUser] = useMutation(UNBAN_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [actioning, setActioning] = useState(false);

  const users = data?.getAdminUsers.users ?? [];
  const pagination = data?.getAdminUsers.pagination;
  const onlineNow = users.filter((u) => u.isOnline).length;

  const handleAction = async () => {
    if (!confirming) return;
    setActioning(true);
    try {
      const vars = { variables: { userId: confirming.userId } };
      if (confirming.type === "ban") await banUser(vars);
      if (confirming.type === "unban") await unbanUser(vars);
      if (confirming.type === "delete") await deleteUser(vars);

      toast.success(
        confirming.type === "ban"
          ? "User banned"
          : confirming.type === "unban"
            ? "User unbanned"
            : "User deleted",
      );
      setConfirming(null);
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActioning(false);
    }
  };

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      {/* HEADER */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#391713]">Users</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-gray-500 text-sm">
              {pagination?.total ?? 0} total users
            </p>
            {onlineNow > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {onlineNow} online now
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-3 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <AdminSearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by name, email or phone..."
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95322]/20"
        >
          <option value="">All Roles</option>
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
          <option value="rider">Rider</option>
          <option value="logistics">Logistics</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* SUMMARY */}
      {users.length > 0 && <SummaryBar users={users} />}

      {/* LIST */}
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="py-10 text-center text-gray-400">No users found</div>
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((user: AdminUser) => (
            <UserCard
              key={user.id}
              user={user}
              onAction={(type, userId) => setConfirming({ type, userId })}
            />
          ))}
        </div>
      )}

      <AdminPagination
        page={page}
        totalPages={pagination?.totalPages ?? 1}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* CONFIRM MODAL */}
      {confirming && (
        <ConfirmModal
          type={confirming.type}
          onConfirm={handleAction}
          onCancel={() => setConfirming(null)}
          loading={actioning}
        />
      )}
    </main>
  );
}
