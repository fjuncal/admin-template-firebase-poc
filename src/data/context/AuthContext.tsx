import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "@/model/Usuario";
import route from "next/router";
import Cookies from "js-cookie";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: Boolean;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
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

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-firebase-auth", logado.toString(), {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-firebase-auth");
  }
}

export function AuthProvider(props: any) {
  const [usuario, setUsuario] = useState<Usuario>();
  const [carregando, setCarregando] = useState<Boolean>(true);

  async function configurarSessao(usuarioFireBase: firebase.User | null) {
    if (usuarioFireBase?.email) {
      const usuario = await usuarioNormalizado(usuarioFireBase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(undefined);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function loginGoogle() {
    try {
      setCarregando(true);
      const resp = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      configurarSessao(resp.user!);
      route.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function logout() {
    try {
      setCarregando(true);
      await firebase.auth().signOut();
      await configurarSessao(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-firebase-auth")) {
      //passando uma função quando o id do token for trocado
      const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
      return () => cancelar();
    } else {
      setCarregando(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        loginGoogle,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
