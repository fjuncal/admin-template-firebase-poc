import { createContext, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "@/model/Usuario";

interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(
  usuarioFireBase: firebase.User
): Promise<Usuario> {
  const token = await usuarioFireBase.getIdToken();
  return {
    uid: usuarioFireBase.uid,
    nome: usuarioFireBase.displayName!,
    email: usuarioFireBase.email!,
    token: token,
    provedor: usuarioFireBase.providerData[0]?.providerId!,
    imagemUrl: usuarioFireBase.photoURL!,
  };
}

export function AuthProvider(props: any) {
  const [usuario, setUsuario] = useState<Usuario>();

  async function loginGoogle() {}

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loginGoogle,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
