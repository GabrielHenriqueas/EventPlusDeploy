import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";

// import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
// import Container from "../../components/Container/Container";
import api, { commentaryEventResource, eventsResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource } from "../../Services/Service";
import { useParams } from "react-router-dom";

const DetalhesEventoPage = () => {

  const { idEvento } = useParams();
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification

  const [ evento, setEvento ] = useState([]);
  const [ comentarios, setComentarios ] = useState([]);

  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        // const promise = await api.get(nextEventResource);
        const buscaEvento = await api.get(`${eventsResource}/${idEvento}`);
        const comentariosPromise = await api.get(`${commentaryEventResource}`);
        
        setEvento(buscaEvento.data);
        setComentarios(comentariosPromise.data);

        // const dados = await promise.data;
        // console.log(dados);
        // setNextEvents(dados); //atualiza o state
      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }

    getNextEvents(); //chama a função
  }, [idEvento]);

  return (
    <MainContent>
      <Title titleText={"Detalhes Evento"} additionalClass="custom-title" />
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      <section className="proximos-eventos">
        <Container>

        {/* <div className="events-box">
                <NextEvent
                  key={evento.idEvento}
                  title={evento.nomeEvento}
                  description={evento.descricao}
                  eventDate={evento.dataEvento}
                  idEvent={evento.idEvento}
                />
          </div> */}

          <div>
            
            <p><b>Titulo do Evento: </b>{evento.nomeEvento}</p>
            <p><b>Descricao do Evento: </b> {evento.descricao}</p>
            <p><b>Comentário: </b>{evento.comentario}</p>
            <p><b>Data do Evento: </b>{new Date(evento.dataEvento).toLocaleDateString()}</p>

          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default DetalhesEventoPage;
