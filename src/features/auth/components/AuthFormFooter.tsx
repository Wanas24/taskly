import Link from "next/link";

type authFormFooterProps = {
    text:string;
    route:string;
    routeText:string;
}

function AuthFormFooter(props:authFormFooterProps) {
  return (
    <>
      <p className="text-center mt-12 text-sm text-slate-medium">
        {props.text}
        <span className="ms-1 text-primary font-semibold">
          <Link href={props.route}>{props.routeText}</Link>
        </span>
      </p>
    </>
  );
}

export default AuthFormFooter;
