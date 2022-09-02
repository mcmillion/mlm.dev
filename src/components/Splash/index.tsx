import Image from "next/image";

export const Splash = () => {
  return (
    <section className="py-24 px-8 text-center leading-relaxed lg:leading-relaxed text-2xl lg:text-4xl text-gray-800 dark:text-gray-200">
      <h2 className="text-4xl lg:text-6xl pb-16 bold-text">Hi!</h2>

      <div className="rounded-full mb-8">
        <Image
          className="rounded-full"
          src="/images/avatar.jpg"
          width="256"
          height="256"
          alt="Portrait of Matthew McMillion"
        />
      </div>

      <p>
        I&rsquo;m <span className="bold-text">Matthew McMillion</span>,
      </p>
      <p>a full-stack developer</p>
      <p>building things with </p>
      <p>
        <span className="bold-text">TypeScript</span>
      </p>
    </section>
  );
};
