import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast from "react-hot-toast";

import AppLayout from "./layouts/AppLayout.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Whoops! We hit a snag in the terrain while loading your thoughts. Give it another shot and let's get you back on track!",
        {
          position: "top-center",
        },
      );
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="bottom"
      />

      <AppLayout />
    </QueryClientProvider>
  );
}

export default App;
