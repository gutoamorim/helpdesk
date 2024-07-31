import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import "./new.css";
import { FiPlusCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";

const listRef = collection(db, "custumers");

export const New = () => {
  const { user } = useContext(AuthContext);

  const [custumers, setCustumers] = useState("");
  const [loadCustumers, setLoadCustumers] = useState(true);

  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [custumerSelected, setCustumerSelected] = useState(0);

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  useEffect(() => {
    async function loadCustumers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapshot.docs.size === 0) {
            console.log("Nenhuma empresa encontrada");
            setCustumers([{ id: 1, nomeFantasia: "Freela" }]);
            setLoadCustumers(false);
            return;
          }

          setCustumers(lista);
          setLoadCustumers(false);
        })
        .catch((erro) => {
          console.log("Erro ao buscar os clientes", erro);
          setLoadCustumers(false);
          setCustumers([{ id: 1, nomeFantasia: "Freela" }]);
        });
    }

    loadCustumers();
  }, []);

  function handleChangeCustumer(e) {
    setCustumerSelected(e.target.value);
  }

  async function handleRegister(e) {
    e.preventDefault();
    await addDoc(collection(db, "chamados"), {
      createdAt: new Date(),
      cliente: custumers[custumerSelected].nomeFantasia,
      clienteId: custumers[custumerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado Registrado!");
        setComplemento("");
        setCustumerSelected(0);
      })
      .catch((error) => {
        toast.error("Ops, erro ao registrar chamado, tente mais tarde.");
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustumers ? (
              <input type="text" disabled={true} value="Carregando..." />
            ) : (
              <select value={custumerSelected} onChange={handleChangeCustumer}>
                {custumers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                id=""
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />{" "}
              <span htmlFor="Progresso">Em aberto</span>
              <input
                type="radio"
                name="radio"
                id="Progresso"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />{" "}
              <span>Progresso</span>
              <input
                type="radio"
                name="radio"
                id=""
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />{" "}
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema... (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
