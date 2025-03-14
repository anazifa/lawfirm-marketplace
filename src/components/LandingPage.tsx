import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  DocumentTextIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  HandshakeIcon,
} from '@heroicons/react/24/outline';

const DEFAULT_IMAGE = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

const featuredLawyers = [
  {
    name: 'Ahmed Al-Saud',
    rating: 4.9,
    reviews: 124,
    specialty: 'Corporate Law',
    location: 'Riyadh',
    languages: ['Arabic', 'English'],
    image: DEFAULT_IMAGE,
  },
  {
    name: 'Fatima Al-Qahtani',
    rating: 4.8,
    reviews: 98,
    specialty: 'Family Law',
    location: 'Jeddah',
    languages: ['Arabic', 'English', 'French'],
    image: DEFAULT_IMAGE,
  },
  {
    name: 'Mohammed Al-Harbi',
    rating: 4.7,
    reviews: 87,
    specialty: 'Commercial Law',
    location: 'Dammam',
    languages: ['Arabic', 'English'],
    image: DEFAULT_IMAGE,
  },
];

const testimonials = [
  {
    text: "I found an excellent corporate lawyer through this platform. The process was smooth and the lawyer exceeded my expectations.",
    name: "Abdullah Al-Rashid",
    role: "Business Owner",
    image: DEFAULT_IMAGE
  },
  {
    text: "As a lawyer, this platform has helped me connect with clients who specifically need my expertise. It's been great for growing my practice.",
    name: "Layla Al-Zahrani",
    role: "Family Law Attorney",
    image: DEFAULT_IMAGE
  },
  {
    text: "The client request feature allowed me to describe my legal issue and receive proposals from several qualified lawyers.",
    name: "Khalid Al-Ghamdi",
    role: "Real Estate Developer",
    image: DEFAULT_IMAGE
  }
];

const faqs = [
  {
    question: "How do I find a lawyer on this platform?",
    answer: "You can search for lawyers based on their specialty, location, language, and ratings. You can also post your legal needs and receive proposals from qualified lawyers."
  },
  {
    question: "Are all lawyers on the platform verified?",
    answer: "Yes, all lawyers on our platform are verified and licensed to practice in Saudi Arabia. We conduct thorough background checks and verify their credentials."
  },
  {
    question: "How does the bidding system work for client requests?",
    answer: "After you post a legal service request, qualified lawyers can submit their proposals including their rates and approach. You can then review and choose the best fit."
  },
  {
    question: "Is my communication with lawyers secure and confidential?",
    answer: "Yes, all communications are encrypted and confidential. We maintain strict privacy standards to protect your sensitive information."
  }
];

export const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Connect with Legal Professionals in Saudi Arabia
            </h1>
            <p className="text-xl mb-8">
              Find the right lawyer for your legal needs. Our platform connects clients with qualified legal professionals across Saudi Arabia.
            </p>
            <div className="space-x-4">
              <Link href="/marketplace" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Started
              </Link>
              <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white shadow-lg">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All lawyers on our platform are verified and licensed to practice in Saudi Arabia.</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg">
              <MagnifyingGlassIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">Find the right lawyer based on specialty, location, language, and more.</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Communication</h3>
              <p className="text-gray-600">Private and encrypted messaging between clients and legal professionals.</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg">
              <StarIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ratings & Reviews</h3>
              <p className="text-gray-600">Transparent feedback system to help you make informed decisions.</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg">
              <ClipboardDocumentListIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client Requests</h3>
              <p className="text-gray-600">Post your legal needs and receive competitive bids from qualified lawyers.</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg">
              <DocumentTextIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Resources</h3>
              <p className="text-gray-600">Access to articles, guides, and updates on Saudi Arabian law.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">01</div>
              <UserPlusIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up as a client or legal professional in just a few minutes.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">02</div>
              <ClipboardDocumentListIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Post a Request</h3>
              <p className="text-gray-600">Describe your legal needs or browse lawyer profiles directly.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">03</div>
              <ChatBubbleBottomCenterTextIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Use our secure messaging system to discuss your legal needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">04</div>
              <HandshakeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-600">Finalize agreements and work together on your legal matters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lawyers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Legal Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLawyers.map((lawyer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{lawyer.name}</h3>
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 font-medium">{lawyer.rating}</span>
                    <span className="ml-1 text-gray-500">({lawyer.reviews})</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{lawyer.specialty}</p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Location:</span> {lawyer.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lawyer.languages.map((lang, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect with Legal Professionals?</h2>
          <p className="text-xl mb-8">Join our platform today and find the right lawyer for your legal needs in Saudi Arabia</p>
          <div className="space-x-4">
            <Link href="/marketplace" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </Link>
            <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}; 