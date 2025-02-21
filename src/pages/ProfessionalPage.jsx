import React, { useState } from "react";
import useMembersData from "../hooks/useMembersData";
import useCommentsData from "../hooks/useCommentsData";
import MemberProfile from "../components/MemberProfile";
import Patrocinadores from "../components/Patrocinadores";

import DEFAULT_IMAGE from "../../public/perfil.webp";

const ProfessionalPage = () => {
  const membersUrl =
    "https://docs.google.com/spreadsheets/d/10rg4aqHApm_DDHM5iXaNqHDO4vhJAQWzhs9EN5ZsRw4/gviz/tq?tqx=out:json";
  const commentsUrl =
    "https://docs.google.com/spreadsheets/d/1oAtk3R_31nxBCsuoeW7DiyQEYo9uxy2oiS_dRjuZpWE/gviz/tq?tqx=out:json";

  const { membersData, loading: membersLoading, error: membersError } = useMembersData(membersUrl);
  const { commentsData, loading: commentsLoading, error: commentsError } = useCommentsData(commentsUrl);

  const [filters, setFilters] = useState({
    servicio: "",
    departamento: "",
  });
  const [selectedMember, setSelectedMember] = useState(null);

  const uniqueServices = [...new Set(membersData?.map((member) => member.servicio) || [])];
  const uniqueDepartments = [...new Set(membersData?.map((member) => member.departamento) || [])];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredMembers = membersData?.filter((member) => {
    return (
      (filters.servicio ? member.servicio === filters.servicio : true) &&
      (filters.departamento ? member.departamento === filters.departamento : true)
    );
  }) || [];

  const calculateAverageRating = (email) => {
    const memberComments = commentsData?.filter((comment) => comment.emailProfesional === email) || [];
    if (memberComments.length === 0) return "Sin calificaciones";

    const average =
      memberComments.reduce((acc, curr) => acc + parseFloat(curr.calificacion), 0) / 
      memberComments.length;
    return average.toFixed(1) + " / 5";
  };

  if (selectedMember) {
    return (
      <MemberProfile
        member={selectedMember}
        onBack={() => setSelectedMember(null)}
        commentsData={commentsData}
      />
    );
  }

  if (membersLoading || commentsLoading) return <p className="text-center text-lg">Cargando...</p>;
  if (membersError || commentsError) return <p className="text-center text-lg text-red-500">Error al cargar datos.</p>;

  return (
    <div className="p-6 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-6">Lista de Profesionales</h1>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          name="servicio"
          value={filters.servicio}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 text-sm w-full sm:w-64"
        >
          <option value="">Todos los Servicios</option>
          {uniqueServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <select
          name="departamento"
          value={filters.departamento}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 text-sm w-full sm:w-64"
        >
          <option value="">Todos los Departamentos</option>
          {uniqueDepartments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Miembros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div
              key={member.dni}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <img
                src={member.image || DEFAULT_IMAGE}
                alt={`${member.nombre} ${member.apellido}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{`${member.nombre} ${member.apellido}`}</h3>
                <p className="text-gray-600 text-sm">Servicio: {member.servicio}</p>
                <p className="text-gray-600 text-sm">Departamento: {member.departamento}</p>
                <p className="text-gray-600 text-sm">
                  Calificación: <span className="font-bold">{calculateAverageRating(member.correo)}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No se encontraron profesionales.</p>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 mt-10">Patrocinadores</h1>

      <Patrocinadores />
    </div>
  );
};

export default ProfessionalPage;
