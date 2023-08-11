import { useState } from "react";

const CadastroEmpresa = () => {
  const [formValues, setFormValues] = useState({
    companyName: "",
    tradeName: "",
    cnpj: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    neighborhood: "",
    zipCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3344/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Success, do something
        console.log("Company created successfully!");
      } else {
        // Handle error
        console.error("Error creating company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div>
      <h1>Cadastro de Empresa</h1>
      <form onSubmit={handleSubmit}>
        {/* Render input fields for each form value */}
        {/* Example: */}
        <input
          type="text"
          name="companyName"
          value={formValues.companyName}
          onChange={handleChange}
          placeholder="Nome da Empresa"
        />
        {/* ... (other input fields) */}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroEmpresa;
