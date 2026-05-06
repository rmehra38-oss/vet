import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'vet' ? 'vet' : 'owner';
  const [role, setRole] = useState<'owner' | 'vet'>(initialRole);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'vet' || r === 'owner') {
      setRole(r);
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: role,
          isVerified: false,
          createdAt: serverTimestamp(),
        });
      }
      
      const updatedProfile = (await getDoc(docRef)).data();
      if (updatedProfile?.role === 'vet') {
        navigate('/vet/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-brand-teal rounded-2xl mx-auto flex items-center justify-center text-white mb-6">
            <HeartPulse size={32} />
          </div>
          <h2 className="text-3xl font-serif">Welcome Back</h2>
          <p className="text-brand-teal/60">Choose your account type to continue</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setRole('owner')}
            className={`p-4 rounded-xl border-2 transition-all ${
              role === 'owner' 
                ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' 
                : 'border-transparent bg-brand-teal/5 text-brand-teal/40'
            }`}
          >
            <div className="font-bold">I'm an Owner</div>
            <div className="text-xs">Pet or Livestock</div>
          </button>
          <button
            onClick={() => setRole('vet')}
            className={`p-4 rounded-xl border-2 transition-all ${
              role === 'vet' 
                ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' 
                : 'border-transparent bg-brand-teal/5 text-brand-teal/40'
            }`}
          >
            <div className="font-bold">I'm a Vet</div>
            <div className="text-xs">Certified Professional</div>
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn-primary w-full py-4 text-brand-teal bg-white border border-brand-teal/10 hover:bg-brand-neutral"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-teal"></div>
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-2" alt="Google" />
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <div className="pt-6 border-t border-brand-teal/10 flex items-center gap-2 text-xs text-brand-teal/40 justify-center">
          <ShieldCheck size={14} />
          Secure, encrypted medical records
        </div>
      </motion.div>
    </div>
  );
}
