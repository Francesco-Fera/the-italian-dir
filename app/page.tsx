import CategoryList from "./components/CategoryList";
import FeaturedStartups from "./components/FeaturedStartups";
import Hero from "./components/Hero";
import RecentAddedStartups from "./components/RecentAddedStartups";
import { getAllCategories } from "./lib/actions";

export default async function Home() {
  const allCategories = await getAllCategories();

  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8'>
      <Hero />
      <FeaturedStartups />
      <RecentAddedStartups />
      <div className='my-16'>
        <h3 className='text-2xl font-bold'>Esplora le Categorie</h3>
        <CategoryList categories={allCategories} />
      </div>
    </div>
  );
}
