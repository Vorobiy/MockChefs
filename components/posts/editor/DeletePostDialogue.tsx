import { useDeletePostMutation } from "@/app/api/posts/for-you/mutations";
import LoadingButton from "@/components/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostData } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface DeletePostDialogueProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialogue({
  post,
  open,
  onClose,
}: DeletePostDialogueProps) {
  const mutation = useDeletePostMutation(post);

  function handleOpenChange(open: boolean) {
    if (!open || mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
