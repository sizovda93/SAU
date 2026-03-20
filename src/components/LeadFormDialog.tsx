import { useState } from "react";
import { Send } from "lucide-react";

import LeadForm from "@/components/LeadForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LeadFormDialogProps {
  triggerClassName?: string;
  triggerLabel?: string;
}

const LeadFormDialog = ({
  triggerClassName,
  triggerLabel = "Оставить заявку",
}: LeadFormDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={triggerClassName}>
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] gap-0 overflow-hidden rounded-2xl border-0 bg-[#F4F6F9] p-0 shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0F2341] to-[#1B3A6B] px-6 pb-5 pt-5">
          {/* Subtle decorative glow */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.03]" />

          <DialogHeader className="relative z-10 space-y-1.5 text-left">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08]">
              <Send className="h-4 w-4 text-white/80" />
            </div>
            <DialogTitle className="text-xl font-semibold tracking-tight text-white">
              Заявка на подключение
            </DialogTitle>
            <DialogDescription className="text-[13px] leading-relaxed text-white/50">
              Заполните форму, и мы свяжемся с вами, чтобы показать платформу и обсудить условия.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 pt-5">
          <LeadForm source="hero_dialog" onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
