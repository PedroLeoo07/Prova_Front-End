"use client";

import styles from "./Home.module.css";
import {Button, Card, Flex, Typography} from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Card hoverable className={styles.card}>
      <Flex justify="space-between">
        <div className={styles.imageContainer}>
          <Image src="/image/leonardo.jpeg" alt="Leonardo" fill className={styles.image} />
        </div>

        <Flex vertical align="flex-end" justify="space-around">
          <div>
            <Typography.Title level={3} className={styles.title}>
              Leonardo
            </Typography.Title>
            <Typography.Text className={styles.text}>
              Olá, sou o Leonardo, desenvolvedor Front-End e estudante de Análise e Desenvolvimento de Sistemas.
            </Typography.Text>
            <Typography.Paragraph className={styles.paragraph}>
              <ul className={styles.list}>
                <li>2TDS2</li>
                <li><strong>Instrutores</strong></li>
                <li>Marcello</li>
                <li>Thiago</li>
              </ul>
            </Typography.Paragraph>
            <h2>Api Jogadores e time de futebol</h2>
            <p>
              A minha API foi sobre jogadores e times de futebol, eu utilizei nessa API o node.js, a API consite em um CRUD, onde eu consigo criar, ler, atualizar e deletar jogadores e times de futebol.
              <br />
            </p>
          </div>
          <Link href="/jogador" prefetch>
            <Button type="primary" className={styles.button}>
              API via Axios
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}