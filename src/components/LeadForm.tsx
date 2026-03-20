import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Phone, Mail, Tag, ArrowRight, Check } from "lucide-react";

import { createLead } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const leadFormSchema = z.object({
  full_name: z.string().min(5, "Укажите ФИО полностью"),
  phone: z.string().min(7, "Укажите телефон"),
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

const mainFields = [
  { name: "full_name" as const, label: "ФИО", placeholder: "Иванов Иван Иванович", icon: User, type: "text" },
  { name: "phone" as const, label: "Телефон", placeholder: "+7 (999) 123-45-67", icon: Phone, type: "tel" },
  { name: "email" as const, label: "Email", placeholder: "name@example.com", icon: Mail, type: "email" },
];

const promoField = { name: "promo_code" as const, label: "Промокод", placeholder: "Если есть", icon: Tag, type: "text" };

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
      <div className="space-y-3.5">
        {mainFields.map((field) => {
          const error = errors[field.name];
          return (
            <div key={field.name}>
              <label className="mb-1 block text-[11px] font-medium tracking-wide text-slate-400">
                {field.label}
              </label>
              <div className="relative">
                <field.icon className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-300/80" />
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-navy outline-none transition-all placeholder:text-slate-300/70 focus:border-[#4A8AFF] focus:ring-1 focus:ring-[#4A8AFF]/15 ${
                    error ? "border-red-300/80 bg-red-50/30" : "border-slate-200/80"
                  }`}
                />
              </div>
              {error && (
                <p className="mt-0.5 text-[11px] text-red-400">{error.message}</p>
              )}
            </div>
          );
        })}

        {/* Promo code — secondary field */}
        <div>
          <label className="mb-1 block text-[11px] font-medium tracking-wide text-slate-300">
            {promoField.label}
          </label>
          <div className="relative">
            <promoField.icon className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-200" />
            <input
              type={promoField.type}
              placeholder={promoField.placeholder}
              {...register(promoField.name)}
              className="h-10 w-full rounded-lg border border-slate-200/60 bg-white/60 pl-10 pr-4 text-sm text-navy outline-none transition-all placeholder:text-slate-300/50 focus:border-[#4A8AFF] focus:ring-1 focus:ring-[#4A8AFF]/15"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2A6DFF] text-[13px] font-semibold text-white shadow-md shadow-[#2A6DFF]/20 transition-all hover:-translate-y-0.5 hover:bg-[#3B7AFF] hover:shadow-lg hover:shadow-[#2A6DFF]/25 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {submitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-300">
        Нажимая кнопку, вы соглашаетесь на{" "}
        <span className="underline underline-offset-2">обработку персональных данных</span>
      </p>
    </form>
  );
};

export default LeadForm;
