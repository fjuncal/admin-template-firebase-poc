import useAuth from "@/data/hook/useAuth";
import Link from "next/link";

export default function AvatarUsuario() {
  const { usuario } = useAuth();
  return (
    <Link href={"/perfil"}>
      <img
        src={usuario?.imagemUrl ?? "/images/avatar.svg"}
        alt="Avatar do usuário"
        className="h-10 w-10 rounded-full cursor-pointer"
      />
    </Link>
  );
}
