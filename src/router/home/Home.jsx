import React from "react";
import FeaturedPlaylist from "../../components/FeaturedPlaylist";
import HomePlaylist from "../../components/HomePlaylist";
import RecentPlaylist from "../../components/RecentPlaylist";
import JumpbackinPlaylist from "../../components/JumpbackinPlaylist";
import UniquelyyoursPlaylist from "../../components/UniquelyyoursPlaylist";
import Navbar from "../../components/Navbar";
import "./Home.scss";
import Madeforyou from "../../components/MadeforyouPLaylist";
import Spotify from "../../components/Spotify";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <FeaturedPlaylist />
      <HomePlaylist />
      <Madeforyou />
      <RecentPlaylist />
      <JumpbackinPlaylist />
      <UniquelyyoursPlaylist />
    </div>
  );
};

export default Home;
