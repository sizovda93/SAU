import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Phone, Mail, Tag, ArrowRight, Check } from "lucide-react";

import { createLead } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const leadFormSchema = z.object({
  full_name: z.string().min(5, "Укажите ФИО полностью"),
  phone: z.string().min(10, "Укажите телефон"),
  email: z.string().email("Укажите корректный email"),
  promo_code: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  source: string;
  submitLabel?: string;
  onSuccess?: () => void;
  className?: string;
}

const defaultValues: LeadFormValues = {
  full_name: "",
  phone: "",
  email: "",
  promo_code: "",
};

const fields = [
  { name: "full_name" as const, label: "ФИО", placeholder: "Иванов Иван Иванович", icon: User, type: "text" },
  { name: "phone" as const, label: "Телефон", placeholder: "+7 (999) 123-45-67", icon: Phone, type: "tel" },
  { name: "email" as const, label: "Email", placeholder: "name@example.com", icon: Mail, type: "email" },
  { name: "promo_code" as const, label: "Промокод", placeholder: "Если есть", icon: Tag, type: "text" },
];

const LeadForm = ({
  source,
  submitLabel = "Отправить заявку",
  onSuccess,
  className,
}: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setSubmitting(true);
      await createLead({
        ...values,
        promo_code: values.promo_code?.trim() || null,
        consent_policy: true,
        consent_offers: true,
        source,
      });

      setSuccess(true);
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время.",
      });

      setTimeout(() => {
        reset(defaultValues);
        setSuccess(false);
        onSuccess?.();
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Не удалось отправить",
        description: error.message || "Попробуйте ещё раз.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  });

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-lg font-semibold text-navy">Заявка отправлена!</p>
        <p className="mt-1 text-sm text-slate-500">Мы скоро свяжемся с вами</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="space-y-4">
        {fields.map((field) => {
          const error = errors[field.name];
          return (
            <div key={field.name}>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                {field.label}
              </label>
              <div className="relative">
                <field.icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className={`h-12 w-full rounded-xl border bg-slate-50/80 pl-11 pr-4 text-sm text-navy outline-none transition-all placeholder:text-slate-300 focus:border-blue-vivid focus:bg-white focus:ring-2 focus:ring-blue-vivid/20 ${
                    error ? "border-red-300 bg-red-50/50" : "border-slate-200"
                  }`}
                />
              </div>
              {error && (
                <p className="mt-1 text-xs text-red-500">{error.message}</p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-vivid text-sm font-semibold text-white shadow-lg shadow-blue-vivid/25 transition-all hover:-translate-y-0.5 hover:bg-blue-sky hover:shadow-xl hover:shadow-blue-vivid/30 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {submitting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
};

export default LeadForm;
