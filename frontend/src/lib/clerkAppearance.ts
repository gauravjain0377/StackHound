import { dark } from '@clerk/themes';
import type { Appearance } from '@clerk/types';

/**
 * StackHound "True Black" Clerk appearance config.
 *
 * Design rules:
 *  - Background:   #09090B  (zinc-950)
 *  - Inputs:       #18181B  (zinc-800)
 *  - Borders:      #27272a  (dark gray, 1px solid, no shadows)
 *  - Accent:       #6366f1  (electric indigo — matches dashboard design system)
 *  - Typography:   Inter (inherited from root layout --font-sans)
 */
export const clerkAppearance: Appearance = {
  baseTheme: dark,
  variables: {
    colorBackground: '#09090B',
    colorInputBackground: '#18181B',
    colorInputText: '#ffffff',
    colorPrimary: '#6366f1',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255, 255, 255, 0.4)',
    colorNeutral: 'rgba(255, 255, 255, 0.6)',
    colorDanger: '#f87171',
    borderRadius: '10px',
    fontFamily: `'Inter', system-ui, -apple-system, sans-serif`,
    fontSize: '14px',
  },
  elements: {
    // ── Card ──────────────────────────────────────────────
    card: {
      backgroundColor: '#09090B',
      border: '1px solid #27272a',
      boxShadow: 'none',
      borderRadius: '14px',
    },

    // ── Header ───────────────────────────────────────────
    headerTitle: {
      color: '#ffffff',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    headerSubtitle: {
      color: 'rgba(255, 255, 255, 0.4)',
    },

    // ── Social / OAuth buttons ───────────────────────────
    socialButtonsBlockButton: {
      backgroundColor: '#18181B',
      border: '1px solid #27272a',
      boxShadow: 'none',
      color: 'rgba(255, 255, 255, 0.8)',
      transition: 'border-color 150ms ease, background 150ms ease',
      '&:hover': {
        backgroundColor: '#1f1f23',
        borderColor: 'rgba(99, 102, 241, 0.4)',
      },
    },
    socialButtonsBlockButtonText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '500',
    },

    // ── Divider ──────────────────────────────────────────
    dividerLine: {
      backgroundColor: '#27272a',
    },
    dividerText: {
      color: 'rgba(255, 255, 255, 0.25)',
    },

    // ── Form fields ──────────────────────────────────────
    formFieldLabel: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: '500',
      fontSize: '13px',
    },
    formFieldInput: {
      backgroundColor: '#18181B',
      border: '1px solid #27272a',
      boxShadow: 'none',
      color: '#ffffff',
      transition: 'border-color 150ms ease',
      '&:focus': {
        borderColor: 'rgba(99, 102, 241, 0.5)',
        boxShadow: 'none',
      },
    },

    // ── Primary action button ────────────────────────────
    formButtonPrimary: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      fontWeight: '600',
      border: 'none',
      boxShadow: 'none',
      transition: 'background 150ms ease, transform 100ms ease',
      '&:hover': {
        backgroundColor: '#818cf8',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },

    // ── Footer links ─────────────────────────────────────
    footerActionLink: {
      color: '#818cf8',
      fontWeight: '500',
      '&:hover': {
        color: '#a5b4fc',
      },
    },
    footerActionText: {
      color: 'rgba(255, 255, 255, 0.35)',
    },

    // ── Internal card actions ────────────────────────────
    identityPreview: {
      backgroundColor: '#18181B',
      border: '1px solid #27272a',
      boxShadow: 'none',
    },
    identityPreviewEditButton: {
      color: '#818cf8',
    },

    // ── Alert / error ────────────────────────────────────
    alert: {
      backgroundColor: 'rgba(248, 113, 113, 0.08)',
      border: '1px solid rgba(248, 113, 113, 0.2)',
      boxShadow: 'none',
    },

    // ── Root box (overall wrapper) ───────────────────────
    rootBox: {
      width: '100%',
    },
  },
};
