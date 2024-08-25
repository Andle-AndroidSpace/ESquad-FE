import Center from "../../components/center/Center";
import Leftbar from "../../components/leftbar/Leftbar";
import Header from "../../components/navbar/Header";
import Rightbar from "../../components/rightbar/Rightbar";

const Home = () => {
   return ( 
      <div className="w-full flex flex-col h-screen">
         <Header />
         
         {/* homeContainer */}
         <div className="flex w-full z-10 h-home-c">

            {/* leftbarContainer */}
            <div className="flex-1 h-full flex bg-gray-900 text-white">
               <Leftbar /> 
            </div>

            {/* centerContainer */}
            <main className="h-full flex flex-4 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 sticky px-3 py-4 bg-gray-900 text-white">
               <Center />
            </main>

            {/* rightbarContainer */}
            <div className="h-full flex-1 w-full flex flex-col">
               <Rightbar />
            </div>
         </div>
      </div>

   );
}

export default Home;