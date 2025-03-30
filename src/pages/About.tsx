
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MessageSquare,
  Users,
  Building,
  Shield,
  Award
} from 'lucide-react';

const About = () => {
  const [messageSent, setMessageSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to a backend
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Sharebook</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-10">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-book-accent/10 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-book-accent" />
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-gray-700 mb-4">
                    Sharebook is a community platform for book lovers to buy, sell, trade, and auction books. 
                    Our mission is to connect readers worldwide, give books a second life, and make literature 
                    accessible to everyone.
                  </p>
                  <p className="text-gray-700">
                    Founded in 2023, we've grown to connect thousands of readers who share a passion for 
                    the written word. Every book has a story beyond its pages, and we help those stories continue.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Users className="w-6 h-6 text-book-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Community First</h3>
                      <p className="text-gray-700">We believe in the power of community and shared passion for literature.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Building className="w-6 h-6 text-book-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Sustainability</h3>
                      <p className="text-gray-700">By reusing books, we reduce waste and promote environmental consciousness.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Shield className="w-6 h-6 text-book-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Trust & Safety</h3>
                      <p className="text-gray-700">We prioritize secure transactions and protect our users' information.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Award className="w-6 h-6 text-book-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Quality Selection</h3>
                      <p className="text-gray-700">We ensure that all books on our platform meet quality standards.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <div className="flex flex-col md:flex-row mb-8">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                  <h3 className="font-bold mb-4">Get In Touch</h3>
                  <div className="flex items-center mb-3">
                    <Mail className="w-5 h-5 text-book-accent mr-3" />
                    <span className="text-gray-700">support@sharebook.com</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Phone className="w-5 h-5 text-book-accent mr-3" />
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-book-accent mr-3" />
                    <span className="text-gray-700">Live chat available Mon-Fri, 9am-5pm</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:border-l md:border-gray-200 md:pl-6">
                  <h3 className="font-bold mb-4">Send a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded" 
                        placeholder="Your Name" 
                        required 
                      />
                    </div>
                    <div className="mb-4">
                      <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded" 
                        placeholder="Your Email" 
                        required 
                      />
                    </div>
                    <div className="mb-4">
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded" 
                        rows={4} 
                        placeholder="Your Message" 
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                    {messageSent && (
                      <p className="text-green-600 mt-2 text-center">Message sent successfully!</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
