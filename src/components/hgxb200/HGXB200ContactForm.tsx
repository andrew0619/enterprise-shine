import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const HGXB200ContactForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", message: "" },
  });

  const onSubmit = () => {
    toast({ title: t("hgxb200Page.contact.successTitle"), description: t("hgxb200Page.contact.successMessage") });
    form.reset();
  };

  return (
    <section className="bg-[#000000] py-20">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("hgxb200Page.contact.title")}</h2>
            <p className="text-zinc-400">{t("hgxb200Page.contact.subtitle")}</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormControl><Input placeholder={t("hgxb200Page.contact.name")} className="bg-white border-0 h-12 text-slate-900 placeholder:text-slate-400" {...field} /></FormControl><FormMessage className="text-red-400" /></FormItem>
              )} />
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem><FormControl><Input placeholder={t("hgxb200Page.contact.company")} className="bg-white border-0 h-12 text-slate-900 placeholder:text-slate-400" {...field} /></FormControl><FormMessage className="text-red-400" /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormControl><Input type="email" placeholder={t("hgxb200Page.contact.email")} className="bg-white border-0 h-12 text-slate-900 placeholder:text-slate-400" {...field} /></FormControl><FormMessage className="text-red-400" /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormControl><Input type="tel" placeholder={t("hgxb200Page.contact.phone")} className="bg-white border-0 h-12 text-slate-900 placeholder:text-slate-400" {...field} /></FormControl><FormMessage className="text-red-400" /></FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormControl><Textarea placeholder={t("hgxb200Page.contact.message")} className="bg-white border-0 min-h-[120px] text-slate-900 placeholder:text-slate-400 resize-none" {...field} /></FormControl><FormMessage className="text-red-400" /></FormItem>
              )} />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">{t("hgxb200Page.contact.submit")}</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default HGXB200ContactForm;
