import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [playlistData, setPlaylistData] = useState([]);

  const ClientId = "49a61d580e984b2a9239e73d6796fbc3";
  const ClientSecret = "4b14d4233dc04517ade03d70e698cde1";
  const token = "https://accounts.spotify.com/api/token";
  const url =
    "https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=6&offset=0";

  const getToken = async () => {
    try {
      const response = await fetch(token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(ClientId + ":" + ClientSecret)}`,
        },
        body: "grant_type=client_credentials",
      });
      const data = await response.json();
      localStorage.setItem(
        "asset_token",
        JSON.stringify(`${data.token_type} ${data.access_token}`)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getPlaylists = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("asset_token")}`,
        },
      });
      const data = await response.json();
      setPlaylistData(data.playlists.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlaylists();
    };
    fetchData();
  }, []);

  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <Link to="/" className="home__link">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <Link to="/yourlibrary">
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
      </div>
      {playlistData.map((playlist) => (
        <Link
          to={`playlist/${playlist.id}`}
          key={playlist.id}
          className="featured__playlist_img_name"
        >
          <p className="featured__playlist_name">{playlist.name}</p>
        </Link>
      ))}
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  .home__link{
    color: #fff;
    text-decoration: none;

  }
  a{
    display: flex;
    color: #b3b3b3;
    gap: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .featured__playlist_img_name{
    color: #fff;
    margin-left: 10px;
  }
  .top__mixes_name_li{
    list-style: none;
  }
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 310px;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
      
    }
  }
  }
`;
