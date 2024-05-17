import { useAuth } from '@/context/authContext';
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/logout')({
  component: () => {
    useAuth().logout()
    return (
      <p>
        You have been logged out.
        <Link to="/login"> Login Again?</Link>
      </p>
    );
  }
})