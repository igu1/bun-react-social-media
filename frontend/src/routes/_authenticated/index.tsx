import { apiRoute } from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

function Index() {
  
  const {data} = useQuery({
    queryKey: ["get-current-user"],
    queryFn: async () => {
        return await apiRoute.auth.me.$get().then(res => res.json())
    },
  })

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {data?.data.email}
    </div>
  )
}
