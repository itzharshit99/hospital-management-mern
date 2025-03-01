// import React, { useContext, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Doctors = () => {
//   const navigate = useNavigate();
//   const { speciality } = useParams();
//   const [filterDoc, setFilterDoc] = useState([]);
// <<<<<<< HEAD
//   const { doctors } = useContext(AppContext);

// =======
//   const [showFilter,setShowFilter] = useState(false)

//   const {doctors}=useContext(AppContext);
// >>>>>>> e7bd7b360d7424f3658567c821bb94155d642607
//   const applyFilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [doctors, speciality]);

//   const specialities = [
//     "General physician",
//     "Gynecologist",
//     "Dermatologist",
//     "Pediatricians",
//     "Neurologist",
//     "Gastroenterologist",
//   ];

//   return (
//     <div>
//       <p className="text-gray-600">Browse through the doctors specialist</p>
//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         <div className="flex flex-col gap-4 text-sm text-gray-600">
//           {specialities .map((spec, index) => (
//             <p
//               key={index}
//               onClick={() =>
//                 speciality === spec
//                   ? navigate("/doctors")
//                   : navigate(`/doctors/${spec}`)
//               }
//               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//                 speciality === spec ? "bg-indigo-100 text-black" : ""
//               }`}
//             >
//               {spec}
//             </p>
//           ))}
//         <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-500 text-white':''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
//         <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
//           <p  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Generalphysician</p>
//           <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gynecologist</p>
//           <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Dermatologist</p>
//           <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Pediatricians</p>
//           <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Neurologist</p>
//           <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gastroenterologist</p>
//         </div>
//         <div
//           className="w-full grid gap-4 gap-y-6"
//           style={{
//             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//           }}
//         >
//           {filterDoc.map((item, index) => (
//             <div
//               onClick={() => navigate(`/appointment/${item._id}`)}
//               className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all divide-purple-500"
//               key={index}
//             >
//               <img className="bg-blue-50" src={item.image} alt="" />
//               <div className="p-4">
//                 <div className="flex items-center gap-2 text-sm text-center text-green-500">
//                   <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                   <p>Available</p>
//                 </div>
//                 <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//                 <p className="text-gray-600 text-sm">{item.speciality}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Speciality Filter */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialities.map((spec, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
          <button
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
              showFilter ? "bg-[#5f6FFF] text-white" : ""
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>
        </div>

        {/* Doctors List */}
        <div
          className="w-full grid gap-4 gap-y-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all divide-purple-500"
              key={index}
            >
              <img className="bg-blue-50 w-full h-80" src={item.image} alt={item.name} />
              <div className="p-4">
                {!item.available && <div className="flex items-center gap-2 text-sm text-center text-red-500">
                  <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                  <p>Not Available</p>
                </div>}
                {item.available && <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>}
                
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
