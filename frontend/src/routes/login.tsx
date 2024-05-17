import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FieldApi, useForm } from "@tanstack/react-form";
import { apiRoute } from "@/api/api";
import { useAuth } from "@/context/authContext";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await auth.login({ email: value.email, password: value.password })
      navigate({ to: "/" });
    },
  });

  return (
    <div className="flex justify-center py-10">
      <Card className="w-[350px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <form.Field
                name="email"
                children={(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder={"Enter the email address"}
                      onBlur={field.handleBlur}
                      type="email"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="password"
                children={(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      placeholder={"Enter the password"}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Remember me</span>
                  <Checkbox defaultChecked id="remember-me" />
                </div>
                <a className="text-sm text-blue-600 hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <form.Subscribe
              selector={(state) => [form.state.isValid, state.isSubmitting]}
              children={([canSubmit, isSubmiting]) => (
                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isSubmiting ? "Logging In..." : "Log in"}
                </Button>
              )}
            />
          </CardFooter>
        </form>
        <div className="mt-4 mb-2 border-t pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <a className="text-blue-600 hover:underline" href="#">
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
}
