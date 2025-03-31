
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BookService } from "@/lib/bookService";
import Navbar from "@/components/Navbar";
import { Book } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  Image,
  Upload,
  X
} from "lucide-react";
import { FileService } from "@/lib/fileService";
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

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    
    if (!id) {
      navigate("/books");
      return;
    }
    
    // Load book data
    const loadBook = () => {
      setIsLoading(true);
      try {
        const allBooks = BookService.getAllBooks();
        const foundBook = allBooks.find(book => book.id === id);
        
        if (!foundBook) {
          toast({
            title: "Book not found",
            description: "The book you're looking for doesn't exist",
            variant: "destructive",
          });
          navigate("/books");
          return;
        }
        
        // Check if user has permission to edit this book
        if (foundBook.sellerId !== user?.id && user?.role !== "admin") {
          toast({
            title: "Access denied",
            description: "You don't have permission to edit this book",
            variant: "destructive",
          });
          navigate("/books");
          return;
        }
        
        setBook(foundBook);
        setFilePreview(foundBook.coverImage);
      } catch (error) {
        console.error("Error loading book:", error);
        toast({
          title: "Error",
          description: "Failed to load book details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBook();
  }, [id, isAuthenticated, navigate, toast, user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !book) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      // Show preview
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload the file
      const uploadedFile = await FileService.uploadImage(file);
      
      // Update book with new image URL
      setBook({
        ...book,
        coverImage: uploadedFile.url,
      });
      
      toast({
        title: "Image uploaded",
        description: "The book cover has been updated",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!book) return;
    
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!book) return;
    
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!book) return;
    
    setIsSaving(true);
    try {
      const updatedBook = BookService.updateBook(book.id, book);
      
      if (!updatedBook) {
        throw new Error("Failed to update book");
      }
      
      toast({
        title: "Book updated",
        description: "Your changes have been saved successfully",
      });
      
      navigate(`/books/${book.id}`);
    } catch (error) {
      console.error("Error updating book:", error);
      toast({
        title: "Update failed",
        description: "Failed to update book details",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-book-paper">
        <Navbar />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-book-accent" />
          </div>
        </main>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-book-paper">
        <Navbar />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-2">Book not found</h2>
            <p className="text-gray-500 mb-6">The book you're looking for doesn't exist</p>
            <Button onClick={() => navigate("/books")}>
              Back to Books
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-book-paper">
      <Navbar />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Edit Book</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Edit Book Details</CardTitle>
              <CardDescription>
                Update information about your book listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Book Cover Image */}
                <div className="space-y-2">
                  <Label>Book Cover Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="border-2 border-dashed rounded-md border-gray-300 p-4 hover:bg-gray-50 transition-colors">
                        {filePreview ? (
                          <div className="relative w-full">
                            <img 
                              src={filePreview} 
                              alt="Book cover preview" 
                              className="mx-auto h-48 object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => setFilePreview(book.coverImage)}
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
                                Upload new cover
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
                      value={book.title}
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
                      value={book.author}
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
                    value={book.description}
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
                      value={book.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition*</Label>
                    <Select 
                      value={book.condition} 
                      onValueChange={(value) => handleSelectChange("condition", value)}
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
                    <Input
                      id="language"
                      name="language"
                      value={book.language}
                      onChange={handleChange}
                      placeholder="Book language"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      value={book.isbn}
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
                      value={book.pageCount}
                      onChange={handleChange}
                      placeholder="Number of pages"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-book-accent hover:bg-book-accent/90"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EditBook;
