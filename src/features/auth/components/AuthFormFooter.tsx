import Link from "next/link";

type AuthFormFooterProps = {
    text:string;
    route:string;
    routeText:string;
}

function AuthFormFooter({text,route,routeText}:AuthFormFooterProps) {
  return (
    <>
      <p className="text-center mt-12 text-sm text-slate-medium">
        {text}
        <span className="ms-1 text-primary font-semibold">
          <Link href={route}>{routeText}</Link>
        </span>
      </p>
    </>
  );
}

export default AuthFormFooter;
