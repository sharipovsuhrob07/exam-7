import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HomePlaylist() {
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
      <div className="container">
        <h2 className="top__mixes_title">Your top mixes</h2>
        <div className="top__mixes">
          {playlistData.map((playlist) => (
            <Link className="top__mixes_img_paragraph" to={`playlist/${playlist.id}`} key={playlist.id}>
              <div key={playlist.id}>
                <img
                  className="top__mixes_img"
                  src={playlist.images[0].url}
                  alt=""
                />
                <p className="top__mixes_name">{playlist.name}</p>
                <p className="top__mixes_description">{playlist.description}</p>
              </div>
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
    .top__mixes_title {
      font-family: Circular Std;
      font-size: 30px;
      font-weight: 700;
      line-height: 37.95px;
      letter-spacing: -0.03em;
      text-align: left;
      color: #ffffff;
    }
    .top__mixes_title{
      margin-left: 30px;
    }

    .top__mixes_name {
      font-family: Circular Std;
      font-size: 20px;
      font-weight: 700;
      line-height: 25.3px;
      letter-spacing: 0.03em;
      text-align: left;
      color: #ffffff;
      margin-top: 25px;
      margin-bottom: 8px;
      margin-left: 21px;
    }
    .top__mixes_description {
      font-family: Circular Std;
      font-size: 18px;
      font-weight: 450;
      line-height: 22.77px;
      text-align: left;
      color: #b3b3b3;
      margin-left: 21px;
      width: 182px; /* Set a width here */
      overflow: hidden; /* Add overflow property */
      text-overflow: ellipsis; /* Add text-overflow property */
      white-space: nowrap; /* Add white-space property */
    }

    .top__mixes_img {
      width: 182px;
      height: 182px;
      border-radius: 4px;
      margin-top: 20px;
      margin-left: 21px;
    }

    .top__mixes_img_paragraph {
      width: 224px;
      background-color: #070a12;
      border-radius: 8px;
    }

    .top__mixes {
      display: grid;
      grid-template-columns: repeat(6, 224px);
      gap: 30px;
      justify-content: center;
    }
  }
`;
