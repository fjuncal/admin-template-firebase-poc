import Image from "next/image";
import Head from "next/head";
import loading from "../../public/images/loading.gif";
import useAuth from "@/data/hook/useAuth";
import router from "next/router";

export default function forcarAutenticacao(jsx: any) {
  const { usuario, carregando } = useAuth();
  function renderizarConteudo() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if(!document.cookie.includes("admin-template-firebase-auth")){
                    window.location.href = "/autenticacao"
                }
            `,
            }}
          ></script>
        </Head>
        {jsx}
      </>
    );
  }

  function renderizarCarregando() {
    return (
      <div
        className={`
            flex justify-center items-center h-screen
        `}
      >
        <Image src={loading} alt="Carregando" />
      </div>
    );
  }

  if (!carregando && usuario?.email) {
    return renderizarConteudo();
  } else if (carregando) {
    return renderizarCarregando();
  } else {
    router.push("/autenticacao");
    return null;
  }
}
