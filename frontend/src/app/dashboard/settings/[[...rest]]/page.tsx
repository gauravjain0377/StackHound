'use client';

import { UserProfile } from '@clerk/nextjs';

export default function SettingsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Account Settings
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
          Manage your profile, security preferences, and account details.
        </p>
      </div>

      {/* Embedded Clerk UserProfile component with custom appearance applied globally */}
      <UserProfile routing="path" path="/dashboard/settings" />
    </div>
  );
}
