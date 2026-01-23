import BlogPostCard from "./BlogPostCard";

type ThumbnailType = "servers" | "abstract" | "event" | "tech";
type CategoryColor = "blue" | "purple" | "green" | "orange";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  categoryColor: CategoryColor;
  thumbnail: ThumbnailType;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "NexusAI Studio Launch Announcement",
    date: "Jan 15, 2026",
    category: "News",
    categoryColor: "blue",
    thumbnail: "abstract",
  },
  {
    id: 2,
    title: "Full AI Architecture Layer: H100 to Application",
    date: "Jan 12, 2026",
    category: "Blog",
    categoryColor: "purple",
    thumbnail: "servers",
  },
  {
    id: 3,
    title: "The AI Stack Wars: The Future of Infrastructure",
    date: "Jan 10, 2026",
    category: "Blog",
    categoryColor: "purple",
    thumbnail: "tech",
  },
  {
    id: 4,
    title: "Introducing NexusAI Studio: AI Development Platform",
    date: "Jan 8, 2026",
    category: "Product",
    categoryColor: "green",
    thumbnail: "abstract",
  },
  {
    id: 5,
    title: "Model Mesh and Serverless AI Inference",
    date: "Jan 5, 2026",
    category: "Blog",
    categoryColor: "purple",
    thumbnail: "tech",
  },
  {
    id: 6,
    title: "GTC Developer Conference 2026 Highlights",
    date: "Dec 28, 2025",
    category: "Event",
    categoryColor: "orange",
    thumbnail: "event",
  },
  {
    id: 7,
    title: "AI Factory: Building Enterprise AI Pipelines",
    date: "Dec 22, 2025",
    category: "Blog",
    categoryColor: "purple",
    thumbnail: "servers",
  },
  {
    id: 8,
    title: "Inference Engine 2.0: Performance Breakthrough",
    date: "Dec 18, 2025",
    category: "News",
    categoryColor: "blue",
    thumbnail: "abstract",
  },
  {
    id: 9,
    title: "The Tao of GPU Clusters: Architecture Deep-dive",
    date: "Dec 15, 2025",
    category: "Blog",
    categoryColor: "purple",
    thumbnail: "tech",
  },
  {
    id: 10,
    title: "Strategic Cloud Partnership: Expanding Global Reach",
    date: "Dec 10, 2025",
    category: "News",
    categoryColor: "blue",
    thumbnail: "servers",
  },
  {
    id: 11,
    title: "On-Demand AI Clusters: New Pricing Model",
    date: "Dec 5, 2025",
    category: "Product",
    categoryColor: "green",
    thumbnail: "abstract",
  },
  {
    id: 12,
    title: "December 2025: Platform Updates Summary",
    date: "Dec 1, 2025",
    category: "News",
    categoryColor: "blue",
    thumbnail: "tech",
  },
];

const BlogPostGrid = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              date={post.date}
              category={post.category}
              categoryColor={post.categoryColor}
              thumbnail={post.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostGrid;
