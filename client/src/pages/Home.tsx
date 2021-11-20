import React, { FC } from "react";
import HeroCard from "../components/HeroCard/HeroCard";
import PlayerList from "../components/Player/PlayerList";

const Home: FC = () => {
  return (
    <>
      <HeroCard />
      <PlayerList />
    </>
  );
};

export default Home;
