import { useAuth } from '@/context/authContext'
import { Outlet, createFileRoute } from '@tanstack/react-router'


const Component = () => {
  const data = useAuth()
  if (!data.isAuthenticated) {
    return <div>You Are Not Logged In.<a href="/login"> Login!</a></div>
  }
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({context}) => {
      const queryClient = context.queryClient;
  },
  component: Component
})

