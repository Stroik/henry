import { PageHeader } from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <section>
      <PageHeader title="Henry Challenge" />
      <div className="homepage">
        <div className="header-wrapper">
          <Image
            src="/homepage-header.png"
            alt="Henry Logo"
            fill={true}
            priority={true}
            quality={50}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h2>Objetivo</h2>
        <p>
          Demostrar conocimientos en transformar una vista en Figma a una
          pantalla funcional. Para el challenge se deberá visualizar los datos
          de los líderes de los tours de golf por año.
        </p>

        <h2>Alcance</h2>
        <p>
          Únicamente se espera buscar la data de la API{" "}
          <strong>(Tour Rankings)</strong>, listarla en el formato propuesto por
          el Figma. Es necesario incluir test. Se espera sólo versión desktop,
          responsive será valorado. Cualquier estrategia de reutilización de
          data para performance será valorada. Es muy importante respetar el
          figma.
        </p>

        <h2>Stack</h2>
        <ol>
          <li>React</li>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Jest + Cypress</li>
          <li>RapidApi free account</li>
        </ol>

        <h2>Entregable</h2>
        <p>
          Un link al repositorio en Github con acceso a la cuenta{" "}
          <strong>eprieto@soyhenry.com</strong>
        </p>

        <h2>Documentación</h2>
        <ol>
          <li>
            <Link
              href="https://www.figma.com/file/R4PDnD3SIGubY3hv1tltee/Henry-Challenge?type=design&node-id=0%3A1&mode=design&t=0DYWquePSbP2ZcnZ-1"
              target="_blank"
            >
              Figma
            </Link>
          </li>
          <li>
            <Link
              href="https://rapidapi.com/sportcontentapi/api/golf-leaderboard-data"
              target="_blank"
            >
              API
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
