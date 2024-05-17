import { apiRoute } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/posts")({
  component: Post,
});

async function getAllPosts() {
  await new Promise((r) => setTimeout(r, 1000));
  const res = await apiRoute.posts.$get();
  if (!res.ok) {
    throw new Error("Server Error Found..");
  }
  const data = await res.json();
  return data;
}

export default function Post() {
  const { data, isPending, error } = useQuery({ queryKey: ["get-all-posts"], queryFn: getAllPosts });

  const allExpences = data?.expences;

  if (error) return "An Error Occured " + error.message;

  return (
    <div className="w-1/2 h-screen m-auto">
      <Table>
        <TableCaption>A list of your posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : allExpences?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.description}</TableCell>
                  <TableCell className="text-right">{post.author}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
