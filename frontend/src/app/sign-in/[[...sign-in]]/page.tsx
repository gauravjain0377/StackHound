import { SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <SignIn appearance={clerkAppearance} />
    </div>
  );
}
