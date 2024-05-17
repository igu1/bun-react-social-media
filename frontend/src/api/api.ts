import { type AppType } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from 'hono/client'

const client = hc<AppType>('/');

export const apiRoute = client.api;

const useQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: async () => {
        
    },
})