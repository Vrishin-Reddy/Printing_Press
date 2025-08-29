import BookingForm from '@/components/BookingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, ShieldCheck, Clock, CheckCircle2, MapPin } from 'lucide-react';
import EmailLink from '@/components/EmailLink';
import { getWhatsAppLink } from '@/utils/whatsapp';

const Booking = () => {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="mb-4">Book Your Printing Service</h1>
					<p className="text-lg max-w-2xl mx-auto">
						Fill out the form below to request a quote or place an order. We'll
						get back to you as soon as possible.
					</p>
				</div>
			</section>

			{/* Main Section: Form + Info */}
			<section className="section-container">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-8">
						{/* LEFT: Booking Form in Card */}
						<Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
							<CardHeader>
								<CardTitle>Request a Quote / Place an Order</CardTitle>
								<CardDescription>Provide your details and preferences below.</CardDescription>
							</CardHeader>
							<CardContent>
								<BookingForm />
							</CardContent>
						</Card>

						{/* RIGHT: Helpful Info (sticky) */}
						<div className="lg:sticky lg:top-24 space-y-6">
							{/* Quick Help */}
							<Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
								<CardHeader>
									<CardTitle>Need Help Fast?</CardTitle>
									<CardDescription>Reach out directly and we’ll assist you right away.</CardDescription>
								</CardHeader>
								<CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
									<a href="tel:+919391011520">
										<Button className="w-full h-11" variant="secondary"><Phone className="h-4 w-4 mr-2" />Call</Button>
									</a>
									<Button className="w-full h-11" variant="secondary" asChild>
										<EmailLink email="sspress.1912@gmail.com" subject="Booking inquiry">
											<span className="inline-flex items-center"><Mail className="h-4 w-4 mr-2" />Email</span>
										</EmailLink>
									</Button>
									<a href={getWhatsAppLink("Hello! I'd like to inquire about a printing service.")} target="_blank" rel="noopener noreferrer">
										<Button className="w-full h-11 bg-[#25D366] hover:bg-[#1EBE59] text-white">
											<img src="/whatsapp_logo.png" alt="WhatsApp" className="h-5 w-5" />
											WhatsApp
										</Button>
									</a>
								</CardContent>
							</Card>

							{/* Why Choose Us */}
							<Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
								<CardHeader>
									<CardTitle>Why Choose Us</CardTitle>
									<CardDescription>Top reasons customers trust our press.</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex items-start gap-3">
										<ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
										<div>
											<div className="font-medium">Premium Quality</div>
											<div className="text-muted-foreground text-sm">Crisp prints and durable materials for every job.</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Clock className="h-5 w-5 text-primary mt-0.5" />
										<div>
											<div className="font-medium">Fast Turnaround</div>
											<div className="text-muted-foreground text-sm">Most orders completed within your deadline.</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
										<div>
											<div className="font-medium">End-to-End Support</div>
											<div className="text-muted-foreground text-sm">From design assistance to delivery guidance.</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Location & Hours */}
							<Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow sm">
								<CardHeader>
									<CardTitle>Visit or Reach Us</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-primary mt-0.5" />
										<div>
											<div className="font-medium">Address</div>
											<div className="text-muted-foreground text-sm">15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India.</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Clock className="h-5 w-5 text-primary mt-0.5" />
										<div>
											<div className="font-medium">Hours</div>
											<div className="text-muted-foreground text-sm">Mon–Sat, 9:30am – 9:30pm</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Booking;
