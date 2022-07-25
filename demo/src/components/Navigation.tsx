import { useRouter } from "next/router";

const Navigation: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/get-server-side-props")}>Go to getServerSideProps</button>
      <button onClick={() => router.push("/get-initial-props")}>Go to getInitialProps</button>
      <button onClick={() => router.push("/get-static-props")}>Go to getStaticProps</button>
    </div>
  );
};

export default Navigation;
