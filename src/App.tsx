import HackathonCards from "./HackathonCards";
import { Header } from "./Header";
import VideoHeader from "./components/VideoHeader";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen w-full">
      <div className="flex flex-col min-w-full min-h-[50vh]">
        <Header />
      </div>
      {/* <div>
        <VideoHeader />
      </div> */}
      <section className="flex justify-center px-6 py-16 bg-black">
        <HackathonCards />
      </section>
    </div>
  );
}
