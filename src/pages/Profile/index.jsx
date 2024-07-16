import { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import avatar from "../../assets/avatar.png";

import "./profile.css";
import { toast } from "react-toastify";

import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Profile = () => {
  const { user, setUser, storageUser, logout } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  console.log(avatarUrl);

  function handleFile(e) {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      if (file.type === "image/jpeg" || file.type === "image/png") {
        setImageAvatar(file);
        setAvatarUrl(URL.createObjectURL(file));
      } else {
        toast.error("Envie uma imagem do tipo PNG ou JPEG.");
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

    const oploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) =>
      getDownloadURL(snapshot.ref).then(async (downloadUel) => {
        let urlFoto = downloadUel;

        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome,
        }).then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFoto,
          };

          setUser(data);
          storageUser(data);
          toast.success("Perfil atualizado com sucesso!");
        });
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (imageAvatar === null && nome !== "") {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome: nome,
      }).then(() => {
        let data = {
          ...user,
          nome: nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso!");
      });
    } else if (imageAvatar !== null && nome !== "") {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label>E-mail</label>
            <input type="email" value={email} disabled />

            <button type="submit" onClick={handleSubmit}>
              Salvar
            </button>
          </form>
        </div>
        <div className="container">
          <button className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};
