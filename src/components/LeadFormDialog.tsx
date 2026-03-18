import { useState } from "react";
import { Send, User, Phone, Mail, Tag } from "lucide-react";

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

      <DialogContent className="max-w-[520px] gap-0 overflow-hidden rounded-3xl border-0 bg-white p-0 shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#122B5C] to-[#1A3F7A] px-8 pb-8 pt-8">
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
          <div className="absolute -right-4 top-12 h-20 w-20 rounded-full bg-white/5" />

          <DialogHeader className="relative z-10 space-y-2 text-left">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Send className="h-5 w-5 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-white">
              Заявка на подключение
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-white/60">
              Заполните форму, и мы свяжемся с вами, чтобы показать платформу и обсудить условия.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="px-8 pb-8 pt-6">
          <LeadForm source="hero_dialog" onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
