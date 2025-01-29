import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className='py-8'>
      <div className='container text-center'>
        <div className='mx-auto flex max-w-screen-lg flex-col gap-6'>
          <h1 className='text-3xl font-extrabold lg:text-6xl'>
            La{" "}
            <span className='text-primary font-black font-[family-name:var(--font-geist-mono)]'>
              {" "}
              directory
            </span>{" "}
            delle startup italiane.
          </h1>
          <p className='text-balance text-muted-foreground lg:text-lg'>
            Scopri le startup italiane più innovative e promuovi la tua startup{" "}
            <span className='italic'>made in Italy</span>.
          </p>
        </div>
        <Button size='lg' className='mt-10'>
          Invia una Startup
        </Button>
      </div>
    </section>
  );
};

export default Hero;
