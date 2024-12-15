import { Bookmark, Clock, Tag } from "lucide-react";
import Image from "next/image";
interface BlogCardProps {
    item: {
      image: string;
      title: string;
      paragraph: string;
      readMore: string;
      date: string;
      category: string;
      tags: string;
      tips?: string;  // Make 'tips' optional
      food?: string;  // Make 'food' optional
    };
  }

const BlogCard = ({ item }: BlogCardProps) => {
  const { image, title, paragraph, readMore, date, tips, food } = item || {};
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg">
      {/* Blog Image */}
      <Image
        src={image}
        alt="blogCard"
        className="w-[300px] h-auto"
        layout="responsive"
        width={0}
        height={0}
      />

      {/* Blog Content */}
      <div className="p-6 space-y-4">
        {/* Blog Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#7fad39] " />
            {date}
          </span>
          <span className="flex items-center gap-2">
            <Bookmark size={16} className="text-[#7fad39]" />
            {tips}
          </span>
          <span className="flex items-center gap-2">
            <Tag size={16} className="text-[#7fad39]" />
            {food}
          </span>
        </div>

        {/* Blog Title */}
        <h2 className="text-2xl font-semibold text-gray-800 hover:text-[#7fad39] transition">
          {title}
        </h2>

        {/* Blog Paragraph */}
        <p className="text-gray-600 line-clamp-3">{paragraph}</p>

        {/* Read More Button */}
        <button className="bg-[#7fad39]  text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
          {readMore}
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
