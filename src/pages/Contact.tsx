
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { Phone, Mail, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';
import EmailLink from '@/components/EmailLink';
import GoogleFormEmbed from '@/components/GoogleFormEmbed';

const Contact = () => {
  const formValues = React.useMemo(() => ({ name: '', phone: '', subject: 'General Inquiry' }), []);

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
            {/* LEFT: Embedded Google Form Card */}
            <div className="contents">
              <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>We usually reply within a few business hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <GoogleFormEmbed
                    title="Send Us a Message"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeVdysxEcUkHBF8TOxGaaIddOJYw525fOz6-ax6XiZ8GUadTg/viewform"
                    minHeight={1500}
                    minHeightMobile={1900}
                  />
                </CardContent>
              </Card>
            </div>

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
