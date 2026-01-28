import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  interestType: z.string().min(1, "Please select an interest type"),
  company: z.string().trim().min(1, "Company name is required").max(100),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const contactCards = [
    {
      title: t("contact.sales.title"),
      description: t("contact.sales.description"),
      email: "sales@nexusai.dev",
    },
    {
      title: t("contact.support.title"),
      description: t("contact.support.description"),
      email: "support@nexusai.dev",
    },
    {
      title: t("contact.media.title"),
      description: t("contact.media.description"),
      email: "info@nexusai.dev",
    },
  ];

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      interestType: "",
      company: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: t("contact.form.successTitle"),
      description: t("contact.form.successMessage"),
    });
    form.reset();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[hsl(210,40%,98%)]">
        {/* Page Header */}
        <section className="pt-20 pb-12">
          <div className="container">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("contact.title")}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="pb-12">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contactCards.map((card) => (
                <Card 
                  key={card.title} 
                  className="bg-background border-0 shadow-sm rounded-xl"
                >
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    <a
                      href={`mailto:${card.email}`}
                      className="font-semibold text-foreground underline hover:text-primary transition-colors"
                    >
                      {card.email}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="pb-20">
          <div className="container">
            <Card className="max-w-4xl mx-auto bg-background border-0 shadow-sm rounded-xl">
              <CardContent className="p-8 md:p-10">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Row 1: First Name & Last Name */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              {t("contact.form.firstName")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                className="border-border rounded-md focus-visible:ring-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              {t("contact.form.lastName")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                className="border-border rounded-md focus-visible:ring-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 2: Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            {t("contact.form.email")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="border-border rounded-md focus-visible:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 3: Interest Type */}
                    <FormField
                      control={form.control}
                      name="interestType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            {t("contact.form.interestType")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-border rounded-md">
                                <SelectValue placeholder={t("contact.form.selectOne")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover">
                              <SelectItem value="gpu-cloud">{t("contact.form.gpuCloud")}</SelectItem>
                              <SelectItem value="inference">{t("contact.form.inference")}</SelectItem>
                              <SelectItem value="cluster">{t("contact.form.cluster")}</SelectItem>
                              <SelectItem value="enterprise">{t("contact.form.enterprise")}</SelectItem>
                              <SelectItem value="partnership">{t("contact.form.partnership")}</SelectItem>
                              <SelectItem value="other">{t("contact.form.other")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 4: Company Name */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            {t("contact.form.company")}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-border rounded-md focus-visible:ring-primary"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      {t("contact.form.submit")}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;