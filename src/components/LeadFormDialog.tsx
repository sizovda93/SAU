import { useState } from "react";

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

const LeadFormDialog = ({ triggerClassName, triggerLabel = "Попробовать бесплатно" }: LeadFormDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={triggerClassName}>
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[560px] rounded-[28px] border-0 bg-white p-0 shadow-float">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,#0A1F44_0%,#12346E_100%)] p-8 text-white">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-3xl font-bold tracking-tight">
              Оставить заявку
            </DialogTitle>
            <DialogDescription className="max-w-[420px] text-sm leading-relaxed text-white/75">
              Заполните форму, и мы свяжемся с вами, чтобы показать платформу и обсудить подключение.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 pt-6">
          <LeadForm source="hero_free_trial" onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
