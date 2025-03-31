import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookService } from "@/lib/bookService";
import { FileService, UploadedFile } from "@/lib/fileService";
import { toast as sonnerToast } from "sonner";
import { Upload, Image, X, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BookCondition = "New" | "Like New" | "Very Good" | "Good" | "Fair" | "Poor";

type BookFormData = {
  title: string;
  author: string;
  description: string;
  price: string;
  condition: BookCondition;
  year: string;
  course: string;
  branch: string;
  coverImage: string;
  isbn: string;
  language: string;
  pageCount: string;
  genre: string[];
};

const initialFormData: BookFormData = {
  title: "",
  author: "",
  description: "",
  price: "",
  condition: "Good",
  year: "",
  course: "",
  branch: "",
  coverImage: "",
  isbn: "",
  language: "English",
  pageCount: "",
  genre: ["Academic"]
};

const SellBookForm = () => {
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      const uploadedFile = await FileService.uploadImage(file);
      setUploadedFile(uploadedFile);
      setFormData(prev => ({ ...prev, coverImage: uploadedFile.url }));
      
      sonnerToast("Image uploaded successfully", {
        description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
      setFilePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearUploadedImage = () => {
    setFilePreview(null);
    setUploadedFile(null);
    setFormData(prev => ({ ...prev, coverImage: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a book for sale",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!user) throw new Error("User data not available");
      
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        pageCount: parseInt(formData.pageCount || "0", 10),
        sellerId: user.id,
        seller: {
          id: user.id,
          name: user.name,
          rating: 4.5,
          avatar: user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=250"
        }
      };
      
      const newBook = BookService.addBook(bookData);
      
      toast({
        title: "Book listed successfully",
        description: "Your book has been listed for sale",
      });
      
      setFormData(initialFormData);
      setFilePreview(null);
      setUploadedFile(null);
      
      navigate(`/books/${newBook.id}`);
    } catch (error) {
      console.error("Error listing book:", error);
      toast({
        title: "Failed to list book",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>List Your Book For Sale</CardTitle>
        <CardDescription>
          Fill out the details below to list your book in our marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Book Cover Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className={`border-2 border-dashed rounded-md ${filePreview ? 'border-book-accent' : 'border-gray-300'} p-4 hover:bg-gray-50 transition-colors`}>
                  {filePreview ? (
                    <div className="relative w-full">
                      <img 
                        src={filePreview} 
                        alt="Book cover preview" 
                        className="mx-auto h-48 object-contain"
                      />
                      <button
                        type="button"
                        onClick={clearUploadedImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Image className="h-12 w-12 text-gray-400" />
                      <div className="mt-2 text-center">
                        <Label 
                          htmlFor="cover-image" 
                          className="cursor-pointer text-book-accent hover:text-book-accent/90 font-medium inline-flex items-center"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Upload book cover
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP up to 5MB</p>
                      </div>
                    </div>
                  )}
                  <Input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex justify-center items-center mt-2">
                      <Loader2 className="h-4 w-4 animate-spin text-book-accent mr-2" />
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title*</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author*</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the book and its condition"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">Condition*</Label>
              <Select 
                value={formData.condition} 
                onValueChange={(value: BookCondition) => setFormData(prev => ({ ...prev, condition: value }))}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Like New">Like New</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={formData.language} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="ISBN identifier"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pageCount">Page Count</Label>
              <Input
                id="pageCount"
                name="pageCount"
                type="number"
                value={formData.pageCount}
                onChange={handleChange}
                placeholder="Number of pages"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Academic Year</Label>
              <Select 
                value={formData.year} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="E.g., Computer Science, Literature"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch/Subject</Label>
              <Input
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="E.g., Programming, Fiction"
              />
            </div>
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Listing book...
                </>
              ) : "List Book for Sale"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default SellBookForm;
