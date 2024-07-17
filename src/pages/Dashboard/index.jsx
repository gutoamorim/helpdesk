import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";

import { Title } from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./dashboard.css";

export const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>
        <Link to="/new" className="new">
          <FiPlus size={25} />
          Novo Chamado
        </Link>
        <table>
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Assunto</th>
              <th scope="col">Status</th>
              <th scope="col">Cadastrado</th>
              <th scope="col">#</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td data-label="Cliente">Tabajara</td>
              <td data-label="Assunto">Suporte</td>
              <td data-label="Status">
                <span className="badge" style={{ backgroundColor: "#999" }}>
                  Em aberto
                </span>
              </td>
              <td data-label="Cadastrado">17/07/2024</td>
              <td data-label="Cadastrado">
                <button
                  className="action"
                  style={{ backgroundColor: "#3583f6" }}
                >
                  <FiSearch size={17} color="#fff" />
                </button>
                <button
                  className="action"
                  style={{ backgroundColor: "#f6a935" }}
                >
                  <FiEdit2 size={17} color="#fff" />
                </button>
              </td>
            </tr>

            <tr>
              <td data-label="Cliente">Bar do Miranda</td>
              <td data-label="Assunto">Suporte</td>
              <td data-label="Status">
                <span className="badge" style={{ backgroundColor: "#999" }}>
                  Em aberto
                </span>
              </td>
              <td data-label="Cadastrado">17/07/2024</td>
              <td data-label="Cadastrado">
                <button
                  className="action"
                  style={{ backgroundColor: "#3583f6" }}
                >
                  <FiSearch size={17} color="#fff" />
                </button>
                <button
                  className="action"
                  style={{ backgroundColor: "#f6a935" }}
                >
                  <FiEdit2 size={17} color="#fff" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
