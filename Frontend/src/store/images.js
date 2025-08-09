    import { create } from 'zustand';
    import axios from 'axios';

    export const useImageStore = create((set) => ({
    imageUrl: '',
    
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

         try {
    // Step 1: Upload to Cloudinary via your backend
    const uploadRes = await axios.post("http://localhost:5000/api/auth/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    set({ imageUrl: uploadRes.data.imageUrl });

    const imageUrl = uploadRes.data.imageUrl;
      await axios.put("http://localhost:5000/api/auth/update-profile-image", { imageUrl }, {
      withCredentials: true,
    });
     
    console.log("Profile image updated successfully!");
        } catch (error) {
        console.error('Image upload failed', error);
        }
    },
    }));



    