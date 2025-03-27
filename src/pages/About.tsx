
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, BookOpen, Users, School } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className={`container ${isMobile ? 'px-4' : 'px-4 md:px-6'} mx-auto`}>
          {!isMobile && (
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-book-accent mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Back to Home</span>
            </Link>
          )}
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">About Us</h1>
            <p className="text-gray-600 mb-8">Sharebook connects book lovers to buy, sell, and auction books</p>
            
            <div className="bg-white rounded-lg shadow-smooth p-6 mb-8">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-book-accent mr-2" />
                <h2 className="text-xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Sharebook is a platform dedicated to creating a sustainable ecosystem for book lovers. 
                We believe in giving books a second life and making knowledge accessible to everyone. 
                Our platform enables users to buy, sell, and auction books in a secure and user-friendly environment.
              </p>
              <p className="text-gray-700">
                Our mission is to reduce waste by encouraging the reuse of books while creating a 
                community of readers who share their love for literature.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-smooth p-6 mb-8">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-book-accent mr-2" />
                <h2 className="text-xl font-bold">Our Team</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <span className="text-xl font-medium">AR</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Ms. Abirami R</h3>
                    <p className="text-gray-600">Lead Researcher</p>
                    <a 
                      href="mailto:abirami.r.cse@sathyabama.ac.in" 
                      className="text-book-accent hover:underline flex items-center mt-1"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      abirami.r.cse@sathyabama.ac.in
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <span className="text-xl font-medium">RG</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Ramireddy G</h3>
                    <p className="text-gray-600">Development Lead</p>
                    <a 
                      href="mailto:goluguriramireddy302@gmail.com" 
                      className="text-book-accent hover:underline flex items-center mt-1"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      goluguriramireddy302@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <span className="text-xl font-medium">DG</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Durgesh G</h3>
                    <p className="text-gray-600">UI/UX Designer</p>
                    <a 
                      href="mailto:durgeshgandi2004@gmail.com" 
                      className="text-book-accent hover:underline flex items-center mt-1"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      durgeshgandi2004@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-smooth p-6">
              <div className="flex items-center mb-4">
                <School className="w-6 h-6 text-book-accent mr-2" />
                <h2 className="text-xl font-bold">Academic Affiliation</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                This project is affiliated with the Department of Computer Science and Engineering,
                Sathyabama Institute of Science and Technology, Chennai, India.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-sm">Year: 2025</p>
                <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Sharebook. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
