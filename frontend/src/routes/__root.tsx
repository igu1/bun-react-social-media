import { useAuth } from '@/context/authContext';
import { type QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Navbar() {
  const auth = useAuth()
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/posts" className="[&.active]:font-bold">
        Posts
      </Link>
      <Link to="/create_post" className="[&.active]:font-bold">
        Create Post
      </Link>
      {!auth.isAuthenticated ? <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link> : <Link to="/logout" className="[&.active]:font-bold">Logout</Link>}
      <Link to="/signup" className="[&.active]:font-bold">
        Signup
      </Link>
    </div>
  );
}

export function Root() {
  return (
    <div>
      <Navbar />
      <hr />
      <Outlet />
    </div>
  );
}
