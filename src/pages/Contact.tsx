
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { Phone, Mail, MapPin, CalendarDays, Send, Paperclip } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { toast } from 'sonner';
import EmailLink from '@/components/EmailLink';
import { filesToBase64, sendToEdge } from '@/lib/sendForm';
import PhoneInput from '@/components/PhoneInput';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [messageLength, setMessageLength] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    name: '',
    phone: '',
    subject: 'General Inquiry'
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = formRef.current!;
    const fd = new FormData(form);

    // Collect files (optional)
    const fileInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'));
    const attachments = await filesToBase64(fileInputs);
    const total = attachments.reduce((s, a) => s + (a.size || 0), 0);
    if (total > 8 * 1024 * 1024) {
      toast.error("Attachments too large (limit 8MB total).");
      return;
    }

    // Check honeypot
    const botcheck = String(fd.get("botcheck") || "");
    if (botcheck) {
      toast.error("Spam detected. Please try again.");
      return;
    }

    // Build JSON payload for Edge Function
    const payload = {
      source: "contact" as const,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject: String(fd.get("subject") || "Contact Request"),
      message: String(fd.get("message") || ""),
      attachments: attachments.length ? attachments.map(({ size, ...rest }) => rest) : undefined,
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      toast.error("Please fill name, email, phone, and message.");
      return;
    }

    setIsSubmitting(true);
    const tid = toast.loading("Sending your message…");
    try {
      await sendToEdge(payload);
      toast.dismiss(tid);
      toast.success("Thanks! Your message was sent.");
      form.reset();
      setSelectedDate(undefined);
      setMessageLength(0);
      setFormValues({ name: '', phone: '', subject: 'General Inquiry' });
    } catch (err: any) {
      toast.dismiss(tid);
      toast.error(err?.message || "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Get in touch with our team for inquiries, support, or to discuss your printing needs.
          </p>
        </div>
      </section>

      {/* Main Section: Form + Info/Map */}
      <section className="section-container">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-8">
            {/* LEFT: Form Card */}
            <form ref={formRef} onSubmit={onSubmit} className="contents" noValidate>
              <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" /> Send Us a Message
                  </CardTitle>
                  <CardDescription>We usually reply within a few business hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Honeypot */}
                  <div className="hidden">
                    <Label htmlFor="botcheck">Bot Check</Label>
                    <Input id="botcheck" name="botcheck" placeholder="Leave empty" aria-hidden="true" tabIndex={-1} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name<span className="text-destructive"> *</span></Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="Enter your full name" 
                        required
                        disabled={isSubmitting} 
                        className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2"
                        onChange={(e) => setFormValues(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email<span className="text-destructive"> *</span></Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="you@example.com" 
                        required
                        disabled={isSubmitting} 
                        className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2" 
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number<span className="text-destructive"> *</span></Label>
                      <PhoneInput 
                        id="phone" 
                        name="phone"
                        disabled={isSubmitting} 
                        required
                        className="focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2"
                        onChange={(value) => setFormValues(prev => ({ ...prev, phone: value }))}
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <select 
                        id="subject"
                        name="subject"
                        defaultValue="General Inquiry"
                        disabled={isSubmitting}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => setFormValues(prev => ({ ...prev, subject: e.target.value }))}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Quote Request">Quote Request</option>
                        <option value="Support">Support</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>

                    {/* Deadline */}
                    <div className="space-y-2">
                      <Label>Deadline (optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button type="button" variant="outline" disabled={isSubmitting} className="w-full justify-start text-left font-normal">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {selectedDate && <input type="hidden" name="deadline" value={selectedDate.toISOString()} />}
                    </div>

                    {/* Message (spans 2 cols) */}
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="message">Message<span className="text-destructive"> *</span></Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        rows={6} 
                        placeholder="Please include a few details..." 
                        required
                        disabled={isSubmitting} 
                        className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2"
                        onChange={(e) => setMessageLength(e.target.value.length)}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{messageLength}/1000</span>
                      </div>
                    </div>

                    {/* Attachment */}
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="attachment">Attachment (optional)</Label>
                      <div className="flex items-center gap-3">
                        <input 
                          id="attachment" 
                          name="attachment"
                          type="file" 
                          multiple
                          accept=".pdf,.png,.jpg,.jpeg,.svg,.tiff" 
                          disabled={isSubmitting} 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Accepted: PDF, PNG, JPG, JPEG, SVG, TIFF (max 10MB each)</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="flex-1 bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1"
                    onClick={() => {
                      if (formRef.current) {
                        formRef.current.reset();
                        setSelectedDate(undefined);
                        setMessageLength(0);
                        setFormValues({ name: '', phone: '', subject: 'General Inquiry' });
                      }
                    }}
                  >
                    Clear form
                  </Button>
                </CardFooter>
              </Card>
            </form>

            {/* RIGHT: Info & Map stack (sticky) */}
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Quick Actions */}
              <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Reach us instantly using any method below.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a href="tel:+919391011520">
                    <Button className="w-full h-11" variant="secondary"><Phone className="h-4 w-4 mr-2" /> Call</Button>
                  </a>
                  <Button className="w-full h-11" variant="secondary" asChild>
                    <EmailLink email="sspress.1912@gmail.com" subject="Quick inquiry">
                      <span className="inline-flex items-center"><Mail className="h-4 w-4 mr-2" /> Email</span>
                    </EmailLink>
                  </Button>
                  <a
                    href={getWhatsAppLink(`Hello! I would like to inquire about ${formValues.subject || 'your printing services'}. My name is ${formValues.name || ''}.`)}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Button className="w-full h-11 bg-[#25D366] hover:bg-[#1EBE59] text-white">
                      <img src="/whatsapp_logo.png" alt="WhatsApp" className="h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Business Info */}
              <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-full"><MapPin className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold">Our Location</div>
                      <div className="text-muted-foreground">
                        15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India.
                      </div>
                      <div className="text-muted-foreground">Business Hours: Mon-Sat, 9:30am - 9:30pm</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-full"><Phone className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">+91 9391011520</div>
                      <div className="text-muted-foreground">M.V.G. Reddy - Owner</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-full"><Mail className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">
                        <EmailLink email="sspress.1912@gmail.com" subject="General inquiry" className="underline hover:opacity-80">
                          sspress.1912@gmail.com
                        </EmailLink>
                      </div>
                      <div className="text-muted-foreground">For quotes and inquiries</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <div className="relative w-full h-72 md:h-96">
                  <iframe
                    title="Sri Sharada Press Location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent('15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India')}&output=embed`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-background border-t">
                  <span className="text-sm text-muted-foreground truncate">
                    15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India')}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Button className="bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400">
                      <MapPin className="h-4 w-4 mr-2" /> Open in Google Maps
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
