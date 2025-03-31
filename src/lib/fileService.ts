
// File service to handle image uploads and processing

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

export class FileService {
  // In a production app, this would upload to a real server/S3
  // For this demo, we'll store in localStorage and return data URLs
  static async uploadImage(file: File): Promise<UploadedFile> {
    return new Promise((resolve, reject) => {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        reject(new Error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`));
        return;
      }

      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        reject(new Error("File must be a valid image (JPEG, PNG or WebP)"));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = () => {
        const result = reader.result as string;
        
        // Store in localStorage for persistence
        const imageStore = JSON.parse(localStorage.getItem('book_images') || '{}');
        const imageId = `image_${Date.now()}`;
        imageStore[imageId] = result;
        localStorage.setItem('book_images', JSON.stringify(imageStore));
        
        // Return the uploaded file info
        resolve({
          url: result,
          name: file.name,
          size: file.size,
          type: file.type
        });
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  static getImageUrl(imageId: string): string | null {
    const imageStore = JSON.parse(localStorage.getItem('book_images') || '{}');
    return imageStore[imageId] || null;
  }
}
