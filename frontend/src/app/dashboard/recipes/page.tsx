'use client';

import { useEffect, useState } from 'react';
import { RecipeCard } from '@/components/RecipeCard';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Recipe {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: '#18181B',
        border: '1px solid #27272a',
        borderRadius: '12px',
        padding: '20px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#27272a', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ width: '60%', height: '16px', borderRadius: '6px', background: '#27272a', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ width: '90%', height: '12px', borderRadius: '6px', background: '#27272a', animation: 'pulse 1.5s ease-in-out 0.2s infinite' }} />
      <div style={{ width: '75%', height: '12px', borderRadius: '6px', background: '#27272a', animation: 'pulse 1.5s ease-in-out 0.4s infinite' }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/recipes');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json = await res.json();
        setRecipes(json.data ?? []);
      } catch (err: any) {
        setError(err.message ?? 'Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #27272a', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#52525b' }}>
          <span>Dashboard</span>
          <span>/</span>
          <span style={{ color: '#a1a1aa' }}>Recipes</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 6px 0', letterSpacing: '-0.02em', color: '#f4f4f5' }}>
            Template Library
          </h1>
          <p style={{ color: '#52525b', margin: 0, fontSize: '14px' }}>
            Start with a pre-built workflow recipe to accelerate your automations.
          </p>
        </div>

        {/* ── Error State ─────────────────────────────────────────────────────── */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '10px',
            padding: '16px 20px',
            color: '#f87171',
            fontSize: '14px',
            marginBottom: '24px',
          }}>
            ⚠ {error}
          </div>
        )}

        {/* ── Empty State ─────────────────────────────────────────────────────── */}
        {!loading && !error && recipes.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#52525b',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', color: '#27272a' }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <p style={{ margin: 0, fontSize: '14px' }}>No recipes yet. Seed the database to get started.</p>
          </div>
        )}

        {/* ── Grid ────────────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : recipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  id={recipe._id}
                  title={recipe.title}
                  description={recipe.description}
                  icon={recipe.icon}
                />
              ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
