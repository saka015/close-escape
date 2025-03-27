"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    // Simulate form submission
    try {
      // In a real app, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#102A26] text-[#F1FAEE]">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-[#A8DADC] max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Get in touch
            with our team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 bg-[#0A1C1A]">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg text-center">
              <div className="text-[#F4A261] text-3xl mb-4 flex justify-center">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-[#A8DADC]">
                <a href="mailto:info@closeescape.com" className="hover:text-[#F4A261] transition-colors">
                  info@closeescape.com
                </a>
              </p>
            </div>
            
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg text-center">
              <div className="text-[#F4A261] text-3xl mb-4 flex justify-center">
                <FaPhone />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-[#A8DADC]">
                <a href="tel:+919876543210" className="hover:text-[#F4A261] transition-colors">
                  +91 9876 543 210
                </a>
              </p>
            </div>
            
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg text-center">
              <div className="text-[#F4A261] text-3xl mb-4 flex justify-center">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-[#A8DADC]">
                123 Travel Lane, Bengaluru<br />
                Karnataka, India 560001
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-[#1B4D3E] p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#F4A261]">
              Send Us a Message
            </h2>
            
            {submitSuccess ? (
              <div className="bg-green-600 bg-opacity-20 border border-green-500 text-green-100 p-4 rounded-lg mb-6 text-center">
                <p className="font-medium">Thank you for your message!</p>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#A8DADC] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#102A26] border border-[#3A7D44] rounded-lg p-3 text-[#F1FAEE] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#A8DADC] mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#102A26] border border-[#3A7D44] rounded-lg p-3 text-[#F1FAEE] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-[#A8DADC] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#102A26] border border-[#3A7D44] rounded-lg p-3 text-[#F1FAEE] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#A8DADC] mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#102A26] border border-[#3A7D44] rounded-lg p-3 text-[#F1FAEE] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-100 p-4 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#F4A261] text-[#102A26] hover:bg-[#e76f51] px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#102A26] mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#0A1C1A]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F4A261]">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">How does CloseEscape work?</h3>
              <p className="text-[#A8DADC]">
                CloseEscape uses your current location, budget preferences, and desired travel distance to suggest personalized trip destinations. Our AI analyzes various factors to recommend the best options for you.
              </p>
            </div>
            
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">Is CloseEscape available worldwide?</h3>
              <p className="text-[#A8DADC]">
                Currently, CloseEscape is optimized for locations in India. We're working on expanding our coverage to more countries soon.
              </p>
            </div>
            
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">How accurate are the cost estimates?</h3>
              <p className="text-[#A8DADC]">
                Our cost estimates are based on average spending data and are meant to provide a general guideline. Actual costs may vary based on your specific choices, season, and other factors.
              </p>
            </div>
            
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">Can I book trips directly through CloseEscape?</h3>
              <p className="text-[#A8DADC]">
                Currently, CloseEscape is a recommendation platform only. We provide suggestions but don't handle bookings. We may add booking features in the future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 