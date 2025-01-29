import { Play, ChevronLeft, ChevronRight, ChevronLast, ChevronFirst, ListVideo, ListPlus } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { assets } from "../assets/assets"
const SidebarContext = createContext()
import { songsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`transition-[width] duration-280 ${
        expanded ? 'w-[18.5%] h-full' : 'w-[4.5%] h-screen'
      }`}
    >
      <nav className="h-full flex flex-col bg-black text-white border-r shadow-sm transition-all duration-300">
        <div className="p-4 pb-2 flex justify-between items-center">
          
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`p-1.5 transition-colors duration-300 ${
              expanded
                ? "rounded-l-lg bg-gradient-to-r from-[#ea67ff] to-[#d4c084]"
                : "rounded-r-lg bg-gradient-to-r from-[#e60202] to-[#d4c084]"
            }`}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div
          className={`place-self-center transition-all duration-300 ${
            expanded ? "w-[80%]  my-[10%]" : "w-[60%] my-0"
          }`}
        >
         
        </div>
        
        
          
      </nav>
    </aside>
  );
}


export function SidebarItem({ icon,text,path,onClick, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <Link to={path} reloadDocument={true} replace style={{ textDecoration: 'none' }}>
    <button
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    
    
    >
      
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-black text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </button>
    </Link>
    
  );
}