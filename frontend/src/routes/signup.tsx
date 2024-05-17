import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldApi, useForm } from "@tanstack/react-form";
import { apiRoute } from "@/api/api";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const res = await apiRoute.auth.signup.$post({ json: value });
      if (!res) {
        throw new Error("Server Error");
      }
      navigate({ to: "/posts" });
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
            <CardTitle>Signup</CardTitle>
            <CardDescription>Enter your details to create your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <form.Field
                name="name"
                children={(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder={"Enter your full name"}
                      onBlur={field.handleBlur}
                      type="text"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
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
              <form.Field
                name="confirmPassword"
                children={(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      placeholder={"Enter the Confirm Password"}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <form.Subscribe
              selector={(state) => [form.state.isValid, state.isSubmitting]}
              children={([canSubmit, isSubmiting]) => (
                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isSubmiting ? "Signing Up..." : "Signup"}
                </Button>
              )}
            />
          </CardFooter>
        </form>
        <div className="mt-4 mb-2 border-t pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <a className="text-blue-600 hover:underline" href="#">
            Login
          </a>
        </div>
      </Card>
    </div>
  );
}
