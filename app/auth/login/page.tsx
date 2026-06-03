import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm pt-12">
        <LoginForm />
      </div>
    </div>
  );
}
