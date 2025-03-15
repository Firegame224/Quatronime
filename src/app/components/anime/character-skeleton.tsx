export default function CharacterSkeleton() {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md animate-pulse">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-600"></div>
        <div className="mt-3 h-4 w-32 mx-auto bg-gray-600 rounded"></div>
        <div className="mt-2 h-3 w-24 mx-auto bg-gray-600 rounded"></div>
        <div className="mt-1 h-3 w-28 mx-auto bg-gray-600 rounded"></div>
      </div>
    );
  }
  