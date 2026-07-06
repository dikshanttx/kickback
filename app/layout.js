import './globals.css';
import SiteShell from '../components/site-shell';
import AuthGuard from './auth-guard';

export const metadata = {
  title: 'ResumX Resume Checker',
  description: 'Frontend-only AI resume analysis dashboard with ATS scoring and improvement suggestions.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthGuard>
          <SiteShell>{children}</SiteShell>
        </AuthGuard>
      </body>
    </html>
  );
}
