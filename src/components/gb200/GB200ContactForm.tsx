import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const GB200ContactForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    toast({
      title: t("gb200Page.contact.successTitle"),
      description: t("gb200Page.contact.successMessage"),
    });
    form.reset();
  };

  return (
    <section className="bg-[#000000] py-20">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t("gb200Page.contact.title")}
            </h2>
            <p className="text-zinc-400">
              {t("gb200Page.contact.subtitle")}
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder={t("gb200Page.contact.name")} 
                        className="bg-white text-slate-900 border-0 rounded-md h-12 placeholder:text-slate-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder={t("gb200Page.contact.company")} 
                        className="bg-white text-slate-900 border-0 rounded-md h-12 placeholder:text-slate-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder={t("gb200Page.contact.email")} 
                        className="bg-white text-slate-900 border-0 rounded-md h-12 placeholder:text-slate-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder={t("gb200Page.contact.phone")} 
                        className="bg-white text-slate-900 border-0 rounded-md h-12 placeholder:text-slate-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder={t("gb200Page.contact.message")} 
                        className="bg-white text-slate-900 border-0 rounded-md min-h-[120px] placeholder:text-slate-400 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mt-2"
              >
                {t("gb200Page.contact.submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default GB200ContactForm;
