import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createLead } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
  legalText?: string;
  onSuccess?: () => void;
  className?: string;
}

const defaultValues: LeadFormValues = {
  full_name: "",
  phone: "",
  email: "",
  promo_code: "",
};

const LeadForm = ({
  source,
  submitLabel = "Отправить заявку",
  legalText = "Нажимая кнопку, вы отправляете данные для обратной связи.",
  onSuccess,
  className = "space-y-5",
}: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      setSubmitting(true);
      await createLead({
        ...values,
        promo_code: values.promo_code?.trim() || null,
        consent_policy: true,
        consent_offers: true,
        source,
      });

      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время.",
      });

      form.reset(defaultValues);
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Не удалось отправить заявку",
        description: error.message || "Попробуйте еще раз позже.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={className}>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input placeholder="Иванов Иван Иванович" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 123-45-67" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="promo_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Промокод</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-slate">{legalText}</p>
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-xl bg-blue-vivid px-7 text-sm font-semibold text-white hover:bg-blue-sky"
          >
            {submitting ? "Отправляем..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LeadForm;
