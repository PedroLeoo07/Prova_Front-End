"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Time.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Times() {
  const [data, setData] = useState({
    times: [],
    loading: true,
    current: 1,
    pageSize: 0,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    time: null,
    logo: null,
    loading: false,
  });

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const { data: times } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/times`,
          {
            headers: HEADERS,
          }
        );
        setData({ times, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar times");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchTimes();
  }, []);

  const openModal = async (time) => {
    setModalInfo({ visible: true, time, logo: null, loading: true });

    try {
      const { data: logo } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/times/${time.id}`,
        {
          headers: HEADERS,
        }
      );
      setModalInfo((m) => ({ ...m, logo, loading: false }));
    } catch {
      toast.error("Erro ao carregar logo.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedTimes = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.times.slice(start, start + data.pageSize);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Lista de Times</h1>
      </div>

      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.times.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "50"]}
      />

      {data.loading ? (
        <Image
          src="/image/gif.webp"
          width={300}
          height={200}
          alt="Loading"
        />
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedTimes().map((time) => (
            <Card
              key={time.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(time)}
              cover={
                <Image
                  alt={time.nome}
                  src={
                    time.photo && time.photo.trim() !== ""
                      ? time.photo
                      : "/images/220.svg"
                  }
                  width={220}
                  height={220}
                />
              }
            >
              <Card.Meta title={time.nome} />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Logo de ${modalInfo.time?.nome}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            time: null,
            logo: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            time: null,
            logo: null,
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.logo ? (
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>Nome do logo:</span>{" "}
              {modalInfo.logo.nome}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>ID do time:</span>{" "}
              {modalInfo.logo.time_id}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Logo não encontrado.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}