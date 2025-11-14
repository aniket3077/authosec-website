import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import anime from 'animejs';

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      anime({
        targets: Array.from(heroRef.current.children),
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: (_el: Element, i: number) => i * 200,
        easing: 'easeOutCubic'
      });
    }

    // Form and info animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            translateX: entry.target === infoRef.current ? [-50, 0] : [50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutCubic'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      // TODO: Implement contact form submission via Firebase Cloud Functions
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAlert({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch {
      setAlert({
        type: 'error',
        message: 'Failed to send message. Please try again or email us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-firebase-blue py-20">
        <div ref={heroRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ opacity: 0 }}>Get In Touch</h1>
          <p className="text-xl text-white/90" style={{ opacity: 0 }}>
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={infoRef} style={{ opacity: 0 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
            <p className="text-dark-300 mb-8">
              Reach out to us through any of the following channels. Our team is available
              Monday through Friday, 9 AM to 6 PM.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 firebase-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-dark-900" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-dark-300">info@authosec.com</p>
                  <p className="text-dark-300">support@authosec.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 firebase-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-dark-900" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Call Us</h3>
                  <p className="text-dark-300">Sales: +1 (555) 123-4567</p>
                  <p className="text-dark-300">Support: +1 (555) 765-4321</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 firebase-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-dark-900" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                  <p className="text-dark-300">
                    123 Business Street
                    <br />
                    Tech City, TC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 bg-dark-800 p-6 rounded-xl border border-dark-700">
              <h3 className="font-semibold text-white mb-3">Business Hours</h3>
              <div className="space-y-2 text-dark-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold text-white">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} style={{ opacity: 0 }}>
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              {alert && (
                <div className="mb-6">
                  <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button type="submit" loading={loading} fullWidth className="firebase-gradient text-dark-900 hover:opacity-90">
                  <Send size={20} />
                  <span>Send Message</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-dark-900 p-6 rounded-xl border border-dark-700">
              <h3 className="font-semibold text-lg text-white mb-2">
                How long does it take to set up?
              </h3>
              <p className="text-dark-300">
                Company registration takes less than 5 minutes. Once approved, you can start using
                the mobile app immediately.
              </p>
            </div>

            <div className="bg-dark-900 p-6 rounded-xl border border-dark-700">
              <h3 className="font-semibold text-lg text-white mb-2">
                Is there a trial period?
              </h3>
              <p className="text-dark-300">
                Yes! We offer a 30-day free trial with full access to all features. No credit card required.
              </p>
            </div>

            <div className="bg-dark-900 p-6 rounded-xl border border-dark-700">
              <h3 className="font-semibold text-lg text-white mb-2">
                What devices are supported?
              </h3>
              <p className="text-dark-300">
                Our mobile app works on iOS 13+ and Android 8+ devices. The web dashboard works on
                all modern browsers.
              </p>
            </div>

            <div className="bg-dark-900 p-6 rounded-xl border border-dark-700">
              <h3 className="font-semibold text-lg text-white mb-2">
                How secure is the platform?
              </h3>
              <p className="text-dark-300">
                We use military-grade encryption, advanced verification, and Firebase/Supabase security.
                All data is encrypted in transit and at rest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
