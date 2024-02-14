import ImageUpload from "@/app/_components/ImageUpload";

const Post = () => {
  return (
    <div>
      <div className="flex flex-col p-8 w-full border-2 border-red-400">
        <div>
          <div className="text-2xl pb-4 font-medium">Name of the Bird:</div>
          <input className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
        </div>
        <div>
          <div className="text-2xl pb-4 font-medium">Location:</div>
          <input className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
        </div>
        <div>
          <div className="text-2xl pb-4 font-medium">Description:</div>
          <textarea className="border border-white h-[225px] resize-none bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
        </div>
        <div>
          <div className="text-2xl pb-4 font-medium">Image:</div>
          <ImageUpload />
        </div>
      </div>
    </div>
  );
};

export default Post;
