import { Toaster } from "@/components/ui/sonner";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";
import { toast } from "sonner";
import { PostsPage } from "@/lib/types";

export function useSubmitPostMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      toast("Post Uploaded. ", {
        description:
          "People on your network should be able to see your post now.",
      });
    },
    onError(error) {
      console.error(error);
      toast("Failed to post. Please try again.", {
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  return mutation;
}
