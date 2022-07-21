const Header = () => {
  return (
    <header className="w-full relative">
      <img
        className="w-full xl:h-screen"
        src={"/images/office-table-with-cup-coffee-keyboard-notepad.jpg"}
        alt="Header image"
      />
      <div className="max-w-[550px] rounded absolute text-[#0E0E52] lg:top-1/2 lg:-translate-y-1/2 top-[25%] sm:ml-12 ml-4">
        <div className="lg:text-4xl sm:text-2xl text-lg sm:font-bold font-medium">
          <div>Its time to get ready and</div>
          <div>go to the world of study</div>
        </div>
        <div className="mt-4 md:block hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </div>
      </div>
    </header>
  );
};

export default Header;
