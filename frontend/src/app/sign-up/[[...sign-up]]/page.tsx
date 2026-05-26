import { SignUp } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export default function SignUpPage() {
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
      <SignUp appearance={clerkAppearance} />
    </div>
  );
}
