"use client";

import styles from "./Home.module.css";
import { Button, Card, Flex, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Card hoverable className={styles.card}>
      <Flex justify="space-between">
        <div className={styles.imageContainer}>
          <Image
  src="/image/leonardo.jpeg"
  alt="Nome do Aluno"
  fill
  className={styles.image}
/>
        </div>
<Flex vertical align="flex-end" justify="space-around">
          <div>
            <Typography.Title level={3}>Leonardo Pedro De Oliveira</Typography.Title>
            <Typography.Title level={5} type="success">
            2TDS1
            </Typography.Title>
            <Typography.Paragraph>
              <h1>Instrutores</h1>
            </Typography.Paragraph>
            <ul className={styles.list}>
                <h3>Thiago</h3>
                <h3>Marcello</h3>
                        </ul>       
            '     
          </div>
          <Link href="/time" prefetch>
          <Button type="primary">Acessar minha API</Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}