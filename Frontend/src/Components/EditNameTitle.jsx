import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {useAuthStore} from "../store/authStore" 
// your zustand store

const EditNameTitle = ({ handleEditShow }) => {
  const { user, updateNameAndTitle ,deleteAccount } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.Title || '');

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      await updateNameAndTitle(name, title);
      toast.success("Profile updated!");
      handleEditShow()
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "Failed to update profile");
    }
  };

  const Close = () => {
    handleEditShow()
  };

const Delete = async () => {
  if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    return;
  }

  try {
    await deleteAccount();
    toast.success("Account deleted successfully.");
  } catch (err) {
    console.error("Delete account error:", err);
    toast.error(err.message || "Failed to delete account");
  }
};

  return (
    <div 
className="bg-[#feefdf] px-4 py-8 rounded-[5vh] shadow-sm lg:w-[70%] md:w-[80%] sm:w-[90%] w-[98%] flex flex-col items-center justify-center gap-10"
    >
    <form
      onSubmit={handleUpdate}
      className='w-full flex flex-col items-center justify-center gap-10 '
    >
      <div className="flex items-end justify-end w-[90%]">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold lg:text-2xl md:text-xl sm:text-xl text-lg bg-black text-white px-4 py-1 rounded-full">
            Edit Name & Title
          </h3>
          <button
            type="button"
            className="rounded-full bg-black text-white shadow-md shadow-gray-200 w-8 h-8 p-2 cursor-pointer text-xl flex items-center justify-center"
            onClick={Close}
          >
            x
          </button>
        </div>
      </div>

      <label className="w-full flex items-center justify-center gap-4">
        <span className="flex items-center justify-start lg:w-[20%] w-[30%] font-bold xl:text-xl lg:text-lg md:text-lg sm:text-md text-sm">
          Name:
        </span>
        <input
          type="text"
          placeholder="Your name"
          className="p-2 border rounded w-[70%]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className="flex items-center justify-start lg:w-[20%] w-[30%] font-bold xl:text-xl lg:text-lg md:text-lg sm:text-md text-sm">
          Title:
        </span>
        <input
          type="text"
          placeholder="Your title"
          className="p-2 border rounded w-[70%]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="bg-zinc-900 w-[50%] cursor-pointer lg:text-xl md:text-lg sm:text-md text-sm text-white py-2 rounded-full shadow-lg shadow-gray-400 hover:bg-zinc-700"
      >
        Save Changes
      </button>
    </form>
     <button
  onClick={Delete}
  type="button"
  className="bg-red-600 w-[50%] cursor-pointer lg:text-xl md:text-lg sm:text-md text-sm text-white py-2 rounded-full shadow-lg shadow-gray-400 hover:bg-red-500"
>
  Delete User Completely
</button>

</div>

  );
};

export default EditNameTitle;
