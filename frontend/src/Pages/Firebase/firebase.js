// Firebase SDK'dan gerekli fonksiyonları içe aktar
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Firebase projenizin konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyDe_oetay_gF5ZawmKCqhiRg99YLL9Fqr8",
  authDomain: "fir-e4c78.firebaseapp.com",
  projectId: "fir-e4c78",
  storageBucket: "fir-e4c78.appspot.com",
  messagingSenderId: "832270166911",
  appId: "1:832270166911:web:03ccbbcc2096fb756e084a",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase Auth ve Google Auth Provider'ı ayarla
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
