import {
  QueryCache,
  QueryClient,
  QueryClientProvider as TsQueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // IMPORTANT: The client must be memoized. Otherwise it's recreated in
  // every render and will lose its internal context
  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
        queryCache: new QueryCache({
          onError: (_error, query) => {
            if (query.meta?.errorMessage) {
              console.error(query.meta.errorMessage);
            }
          },
        }),
      }),
    []
  );

  return (
    <TsQueryClientProvider client={queryClient}>
      {children}
    </TsQueryClientProvider>
  );
};

export default QueryClientProvider;
