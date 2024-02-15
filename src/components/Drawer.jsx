export const Drawer = ({ children, isOpen, setIsOpen }) => {
  return (
    <main
      className={` fixed overflow-hidden z-10 bg-opacity-25 inset-0 transform ease-in-out ${
        isOpen
          ? "transition-opacity opacity-100 duration-500 -translate-y-0"
          : "transition-all  delay-500 opacity-0 translate-y-full"
      } `}
    >
      <section
        className={`w-screen bottom-0 absolute bg-white max-h-full shadow-xl delay-400 duration-500 ease-in-out overflow-hidden transition-all transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } `}
      >
        <article className="relative w-screen flex flex-col space-y-6 h-full bg-white">
          <header className="p-4 font-bold text-lg">Cart items</header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};
