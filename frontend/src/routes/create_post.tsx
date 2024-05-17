import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";

import type { FieldApi } from "@tanstack/react-form";
import { apiRoute } from '@/api/api';

export const Route = createFileRoute("/create_post")({
  component: CreatePost,
});



function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}


export default function CreatePost() {

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      author: '',
    },
    onSubmit: async ({ value }) => {
      const res = await apiRoute.posts.$post({ json: value });
      if (!res) {
        alert("Server Error Found");
        return
      }
      navigate({ to: "/posts" });
    },
  });

  return (
    <div className="flex justify-center p-3">
      <Card className="w-[450px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>Fill out the form to create a new post.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <form.Field
                  name="title"
                  children={(field) => (
                    <>
                      <Label htmlFor={field.name}>Title</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder={"Enter the post title"}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <form.Field
                  name="description"
                  children={(field) => (
                    <>
                      <Label htmlFor={field.name}>Description</Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder={"Enter the post description"}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <form.Field
                  name="author"
                  children={(field) => (
                    <>
                      <Label htmlFor={field.name}>Author</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder={"Enter the post author"}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <form.Subscribe
              selector={(state) => [form.state.isValid, state.isSubmitting]}
              children={([canSubmit, isSubmiting]) => (
                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isSubmiting ? "Creating..." : "Create"}
                </Button>
              )}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
