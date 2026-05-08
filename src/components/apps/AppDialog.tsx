import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const AppDialog = ({
  trigger,
  title,
  label,
  children,
}: {
  trigger: React.ReactNode;
  title: string;
  label: string;
  children: React.ReactNode;
}) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <p className="font-mono text-xs uppercase tracking-wider text-primary">{label}</p>
        <DialogTitle className="text-2xl sm:text-3xl font-bold">
          {title}
          <span className="text-primary">.</span>
        </DialogTitle>
      </DialogHeader>
      <div className="mt-2">{children}</div>
    </DialogContent>
  </Dialog>
);
