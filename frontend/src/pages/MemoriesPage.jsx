import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import { useAuth } from "../context/AuthContext";
import { useMemories } from "../hooks/useMemories";

export default function MemoriesPage() {
  const { user } = useAuth();
  const { fetchMemories, deleteMemory, loading } = useMemories();
  const [memories, setMemories] = useState([]);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMemories().then(setMemories);
    }
  }, [user]);

  const handleDelete = async (id, storagePath) => {
    if (!confirm("Delete this memory? 🥺")) return;
    setDeleting(id);
    try {
      await deleteMemory(id, storagePath);
      setMemories((prev) => prev.filter((m) => m.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  // Not logged in
  if (!user) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <span className="text-6xl mb-4">🔐</span>
          <h2 className="text-3xl font-extrabold text-pink-700 mb-3">Sign In to See Your Memories</h2>
          <p className="text-pink-400 mb-8">Your K-photo strips are saved here after every session 💕</p>
          <Link to="/auth">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
              Sign In / Sign Up 🎀
            </button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-16 px-4 sm:px-6 min-h-screen">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 drop-shadow-lg mb-3">
            🌸 Your K-Memories
          </h2>
          <p className="text-pink-500 text-lg">
            Hi <span className="font-bold">{user.displayName || user.email}</span>! Here are all your saved photo strips 💖
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-4xl animate-spin">🌸</span>
            <p className="text-pink-400 font-medium">Loading your memories…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && memories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <span className="text-6xl">📷</span>
            <h3 className="text-2xl font-bold text-pink-600">No memories yet!</h3>
            <p className="text-pink-400 max-w-sm">
              Go to the booth, take some cute photos, and save them — they'll appear here! 🎀
            </p>
            <Link to="/booth">
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                Go to Booth 📸
              </button>
            </Link>
          </div>
        )}

        {/* Memories Grid */}
        {!loading && memories.length > 0 && (
          <>
            <p className="text-center text-pink-400 text-sm mb-8">
              {memories.length} memory{memories.length !== 1 ? " strips" : " strip"} saved
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {memories.map((memory) => (
                <div key={memory.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative">

                  {/* Image */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center min-h-[220px] p-3">
                    <img
                      src={memory.imageURL}
                      alt="Memory"
                      className="max-h-[220px] w-auto object-contain rounded-lg shadow-sm"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {memory.layout && (
                        <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {memory.layout}
                        </span>
                      )}
                      {memory.filter && (
                        <span className="bg-rose-100 text-rose-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {memory.filter}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {memory.createdAt?.toDate
                        ? memory.createdAt.toDate().toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })
                        : "Just now"}
                    </p>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(memory.id, memory.storagePath)}
                    disabled={deleting === memory.id}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-red-50 text-red-400 hover:text-red-600 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                    title="Delete memory"
                  >
                    {deleting === memory.id
                      ? <span className="text-xs animate-spin block">⏳</span>
                      : <Trash2 size={14} />}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </PageLayout>
  );
}