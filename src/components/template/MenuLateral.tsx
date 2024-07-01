import MenuItem from "./MenuItem";
import {
  IconeCasa,
  IconeAjustes,
  IconeSino,
  IconeSair,
  IconeDieta,
} from "../icons";
import Logo from "./Logo";
import { useRouter } from "next/router";

export default function MenuLateral() {
  const router = useRouter();
  return (
    <aside
      className={`
    flex flex-col
    bg-gray-200 text-gray-700
    dark:bg-gray-900 
    `}
    >
      <div
        className={`
          flex flex-col items-center justify-center
          bg-gradient-to-r from-indigo-500 to-purple-800
        h-20 w-20
        `}
      >
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" texto="Início" icone={IconeCasa} />
        <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjustes} />
        <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
        <MenuItem url="/dieta" texto="Dieta" icone={IconeDieta} />
      </ul>
      <ul className="">
        <MenuItem
          url="/"
          onClick={() => router.push("/autenticacao")}
          texto="Sair"
          icone={IconeSair}
          className={`text-red-600 dark:text-red-400
          hover:bg-red-400 hover:text-white
          dark:hover:text-white
          `}
        />
      </ul>
    </aside>
  );
}
