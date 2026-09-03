import { portfolioData } from "@/data/portfolio";
import PortfolioView from "@/components/PortfolioView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { category: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const categoryData = portfolioData.find((c) => c.id === params.category);
  
  if (!categoryData) {
    return {
      title: "Category Not Found | Artsy",
    };
  }

  return {
    title: `Artsy | ${categoryData.title} Wedding Photography`,
    description: `View premium ${categoryData.title} wedding photography and cinematography by Artsy.`,
  };
}

export function generateStaticParams() {
  return portfolioData.map((category) => ({
    category: category.id,
  }));
}

export default function CategoryPage({ params }: Props) {
  const categoryData = portfolioData.find((c) => c.id === params.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <PortfolioView category={categoryData} />
      </main>
      <Footer />
    </>
  );
}
