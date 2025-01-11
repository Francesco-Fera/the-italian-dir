import PageHeader from "../../components/PageHeader";

function CategoriesRoute() {
  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline='Startup per Categoria'
          subHeadline='Esplora le startup italiane per categoria di appartenenza.'
          backToPath='/esplora'
          backToText='Esplora tutte le startup'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
        {/* Category List */}
      </div>
    </div>
  );
}

export default CategoriesRoute;
