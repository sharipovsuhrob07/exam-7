import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function FeaturedPlaylist() {
  const [playlistData, setPlaylistData] = useState([]);

  const ClientId = "49a61d580e984b2a9239e73d6796fbc3";
  const ClientSecret = "4b14d4233dc04517ade03d70e698cde1";
  const token = "https://accounts.spotify.com/api/token";
  const url =
    "https://api.spotify.com/v1/browse/featured-playlists?limit=8&offset=0";

  // ----------------------------------------------------------------

  const getToken = async () => {
    try {
      // ----------------------------------------------------------------

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

      // ----------------------------------------
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

  // ----------------------------------------------------------------

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

  // ----------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlaylists();
    };
    fetchData();
  }, []);
  return (
    <Container>
      <div className="container">
        <h2 className="featured__playlist_title">Good afternoon</h2>
        <div className="featured__playlists">
          {playlistData.map((playlist) => (
            <Link
              to={`playlist/${playlist.id}`}
              key={playlist.id}
              className="featured__playlist_img_name"
            >
              <img
                className="fetatured__playlist_img"
                src={playlist.images[0].url}
                alt="img"
              />
              <p className="featured__playlist_name">{playlist.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .container {
    width: 1550px;
    margin: 0 auto;
  }
  .featured__playlist_title {
    margin-left: 30px;
  }
  .featured__playlist_title {
    font-family: Circular Std;
    font-size: 39px;
    font-weight: 700;
    line-height: 49.33px;
    letter-spacing: -0.01em;
    text-align: left;
    color: #ffffff;
    margin-bottom: 30px;
  }
  .fetatured__playlist_img {
    width: 82px;
    height: 82px;
    border-radius: 6px 0px 0px 6px;
  }
  .featured__playlist_name {
    font-family: Circular Std;
    font-size: 20px;
    font-weight: 700;
    line-height: 25.3px;
    letter-spacing: 0.01em;
    text-align: left;
    color: #ffffff;
  }
  .featured__playlist_img_name {
    width: 350px;
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: #595959;
    border-radius: 6px 6px 6px 6px;
  }
  .featured__playlists {
    display: grid;
    grid-template-columns: 350px 350px 350px 350px;
    gap: 30px;
    justify-content: center;
  }
`;
