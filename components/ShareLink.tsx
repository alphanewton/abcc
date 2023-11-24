import { Dispatch, SetStateAction } from "react";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Copy, CopyIcon } from "lucide-react";

function ShareLink({
  isOpen,
  chatId,
  setIsOpen,
}: {
  isOpen: boolean;
  chatId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast(); // Initialize the toast function

  const host = window.location.host;

  // Construct the link based on the environment
  const linkToChat =
    process.env.NODE_ENV === "development"
      ? `http://${host}/chat/${chatId}`
      : `https://${host}/chat/${chatId}`;

  // Function to copy the link to the clipboard
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(linkToChat);
      console.log("Text copied to clipboard");

      // Display a success toast message
      toast({
        title: "Copied Successfully",
        description:
          "Share this link with the person you want to chat with! (NOTE: They must be added to the chat to access it!)",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <div>
      <Dialog
        onOpenChange={(open) => setIsOpen(open)}
        open={isOpen}
        defaultOpen={isOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            <Copy className="mr-2" />
            Share Link
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Any user who has been{" "}
            <span className="text-indigo-600 font-bold">granted access</span>{" "}
            can use this link.
          </DialogDescription>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="Link" className="sr-only">
                Link
              </Label>
              <Input id="Link" defaultValue={linkToChat} readOnly />
            </div>

            <Button
              type="submit"
              onClick={() => copyToClipboard()}
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ShareLink;
