"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Time.module.css";


export default function Time() {
  const [data, setData] = useState({
    alunos: [],
    loading: true,
    current: 1,
    pageSize: 0,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    aluno: null,
    avaliacao: null,
    loading: false,
  });

  useEffect(() => {
    const fetchAlunos = async () => {
      const cached = getSessionStorage("alunosData", []);
      if (cached.length > 0) {
        setData({ alunos: cached, loading: false, current: 1, pageSize: 5 });
        return;
      }

      try {
        const { data: alunos } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/estudantes`,
          {
            headers: HEADERS,
          }
        );
        setSessionStorage("alunosData", alunos);
        setData({ alunos, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar alunos");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchAlunos();
  }, []);

  const openModal = async (aluno) => {
    setModalInfo({ visible: true, aluno, avaliacao: null, loading: true });

    const cacheKey = `avaliacao_${aluno.id}`;
    const cached = getSessionStorage(cacheKey, null);
    if (cached) {
      setModalInfo((m) => ({ ...m, avaliacao: cached, loading: false }));
      return;
    }

    try {
      const { data: avaliacao } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/avaliacao/${aluno.id}`,
        {
          headers: HEADERS,
        }
      );
      setSessionStorage(cacheKey, avaliacao);
      setModalInfo((m) => ({ ...m, avaliacao, loading: false }));
    } catch {
      toast.error("Erro ao carregar avaliação.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedAlunos = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.alunos.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <h1>Lista de Alunos</h1>

      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.alunos.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "100"]}
      />

      {data.loading ? (
        <Image
          src="/image/gifCaracol.gif"
          width={300}
          height={200}
          alt="Loading"
        />
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedAlunos().map((aluno) => (
            <Card
              key={aluno.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(aluno)}
              cover={
                <Image
                  alt={aluno.name_estudante}
                  src={aluno.photo ? aluno.photo : "/image/cassio.jpg"}
                  width={220}
                  height={220}
                />
              }
            >
              <Card.Meta
                title={aluno.name_estudante}
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Avaliação de ${modalInfo.aluno?.name_estudante}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            aluno: null,
            avaliacao: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            aluno: null,
            avaliacao: null,
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.avaliacao ? (
          <div className={styles.avaliacaoInfo}>
            <p>
              <span className={styles.label}>Nota:</span>{" "}
              {modalInfo.avaliacao.nota}
            </p>
            <p>
              <span className={styles.label}>Professor:</span>{" "}
              {modalInfo.avaliacao.professor}
            </p>
            <p>
              <span className={styles.label}>Matéria:</span>{" "}
              {modalInfo.avaliacao.materia}
            </p>
            <p>
              <span className={styles.label}>Sala:</span>{" "}
              {modalInfo.avaliacao.sala}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Avaliação não encontrada.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}