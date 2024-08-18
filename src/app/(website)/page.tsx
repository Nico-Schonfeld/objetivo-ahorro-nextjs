import HomePage from "@/components/HomePageComponent/HomePage";
import Navbar from "@/components/NavbarComponent/Navbar";

const AppContainer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <HomePage />
    </div>
  );
};

export default AppContainer;
