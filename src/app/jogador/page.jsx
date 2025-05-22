"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Jogador.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Jogadores() {
  const [data, setData] = useState({
    jogador: [],
    loading: true,  
    current: 1,
    pageSize: 5,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    jogador: null,
    manutencao: null,
    loading: false,
  });

  useEffect(() => {
    const fetchJogador = async () => {
      try {
        const { data: jogador } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jogador`,
          {
            headers: HEADERS,
          }
        );
        setData({ jogador, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar jogadores");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchJogador();
  }, []);

  const openModal = async (jogador) => {
    setModalInfo({ visible: true, jogador, manutencao: null, loading: true });

    try {
      const { data: manutencao } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/time/${jogador.id}`,
        {
          headers: HEADERS,
        }
      );
      setModalInfo((m) => ({ ...m, manutencao, loading: false }));
    } catch {
      toast.error("Erro ao carregar manutenção.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedJogador = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.jogador.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <h1>Lista de Jogadores</h1>

      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.jogador.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "50"]}
      />

      {data.loading ? (
        <Image
          src="/images/loading.gif"
          width={300}
          height={200}
          alt="Loading"
        />
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedJogador().map((jogador) => (
            <Card
              key={jogador.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(jogador)}
              cover={
                <Image
                  alt={jogador.nome}
                  src={
                    jogador.photo && jogador.photo.trim() !== ""
                      ? jogador.photo
                      : "/images/220.svg"
                  }
                  width={220}
                  height={220}
                />
              }
            >
              <Card.Meta
                title={jogador.nome}
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Manutenção de ${modalInfo.jogador?.nome}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            jogador: null,
            manutencao: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            jogador: null,
            manutencao: null,
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.manutencao ? (
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>Nome da manutenção:</span>{" "}
              {modalInfo.manutencao.nome}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>ID do jogador:</span>{" "}
              {modalInfo.manutencao.jogador_id}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Manutenção não encontrada.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}