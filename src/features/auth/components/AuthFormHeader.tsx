type AuthFormHeaderProps ={
    title:string;
    subTitle:string;
}

function AuthFormHeader({title,subTitle}:AuthFormHeaderProps) {
  return (
    <div className="flex flex-col gap-2 text-center max-sm:text-start mb-10">
      <h2 className="font-semibold text-3xl">{title}</h2>
      <p className="text-sm text-slate-medium">
        {subTitle}
      </p>
    </div>
  );
}

export default AuthFormHeader;
