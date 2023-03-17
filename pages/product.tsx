import Head from 'next/head';
import Image from 'next/image';
import Layout from 'components/layout';

export default function Product() {
  return (
    <Layout home>
      <Head>
        <title>Product</title>
      </Head>
      <section id="hero" className="flex py-6 md:py-16">
        <div className="flex flex-col items-start justify-between md:w-1/2">
          <h1 className="text-4xl font-bold lg:text-5xl">
            Unlock the full value of your assets,{' '}
            <span className="text-orange-400">overnight</span>.
          </h1>
          <p className="text-gray-400 my-4">
            Your process for doing your thing will change overnight. No more
            wasting time with that other thing. Straight to the stuff. Forever.
          </p>
          <a
            href="#"
            className="bg-cyan-900 text-slate-200 py-2 px-4 rounded-full hover:bg-cyan-800"
          >
            Do The Thing →
          </a>
        </div>
        <div className="hidden md:block md:w-1/2">
          <Image
            priority
            src="/images/safe.svg"
            width="438"
            height="339"
            alt="unlocked safe with valuables inside"
            className="mx-auto"
          />
        </div>
      </section>
      <h2 className="font-bold text-3xl mt-20 md:text-right lg:text-4xl">
        But, how the heck..?!
      </h2>
      <section
        id="features"
        className="flex flex-col mb-20 md:flex-row-reverse"
      >
        <div className="hidden md:block md:pl-32 md:w-1/2">
          <Image
            src="/images/man-thinking.png"
            alt="man thinking"
            width="288"
            height="288"
          />
        </div>
        <div className="relative space-y-16 mt-10 md:w-1/2 md:space-y-20">
          {/* feature 1 */}
          <div>
            <div className="bg-orange-200 py-2 pr-2 rounded-full relative md:bg-transparent">
              <span className="py-2 px-3 rounded-full bg-orange-300 inline-block absolute left-0 top-0 w-12 text-center md:text-4xl md:bg-transparent">
                🕰️
              </span>
              <span className="font-bold ml-16">Destroy time-wasters</span>
            </div>
            <p className="text-gray-400 my-6 md:max-w-sm md:ml-16">
              {`The things you were doing before were taking too long. With this
            product, you will no longer need to do any of that. It's automated.`}
            </p>
          </div>
          {/* feature 2 */}
          <div className="md:relative md:left-36 lg:left-48">
            <div className="bg-orange-200 py-2 pr-2 rounded-full relative md:bg-transparent">
              <span className="py-2 px-3 rounded-full bg-orange-300 inline-block absolute left-0 top-0 w-12 text-center md:bg-transparent md:text-4xl">
                🔥
              </span>
              <span className="font-bold ml-16">Create sexy reports</span>
            </div>
            <p className="text-gray-400 my-6 md:max-w-sm md:ml-16">
              {`No one likes complicated, drawn-out meetings, especially ones with no visuals. Get sweet reports to impress your peers and superiors, with flashy infographics.`}
            </p>
          </div>
          {/* feature 3 */}
          <div className="md:relative md:left-72 lg:left-96">
            <div className="bg-orange-200 py-2 pr-2 rounded-full relative md:bg-transparent">
              <span className="py-2 px-3 rounded-full bg-orange-300 inline-block absolute left-0 top-0 w-12 text-center md:bg-transparent md:text-4xl">
                🚀
              </span>
              <span className="font-bold ml-16">
                Action everything, everywhere, now
              </span>
            </div>
            <p className="text-gray-400 my-6 md:max-w-sm md:ml-16">
              {`Don't leave your actions unactioned. They were created to be actioned, so be a good sport and get that dopamine hit.`}
            </p>
          </div>
          <div className="hidden absolute bottom-0 -left-16 md:block">
            <div className="relative">
              <Image
                priority
                src="/images/man-shocked.png"
                width="288"
                height="288"
                alt="shocked man in a suit, covering his face with his hands, one eye peeking through"
              />
              <div className="border-b-4 border-purple-500 absolute -left-10 bottom-0 w-[400px]"></div>
            </div>
          </div>
        </div>
      </section>
      {/* TODO testimonials */}
      {/* TODO CTA */}
      {/* TODO footer */}
      {/* https://youtu.be/dFgzHOX84xQ?t=2701 */}
    </Layout>
  );
}
