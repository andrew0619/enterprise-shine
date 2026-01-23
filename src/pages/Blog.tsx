import Layout from "@/components/layout/Layout";
import BlogHero from "@/components/blog/BlogHero";
import BlogPostGrid from "@/components/blog/BlogPostGrid";

const Blog = () => {
  return (
    <Layout>
      <BlogHero />
      <BlogPostGrid />
    </Layout>
  );
};

export default Blog;
