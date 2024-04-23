import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlaylistInfo.scss";

export default function PlaylistInfo() {
  const { id } = useParams();
  console.log(id);

  const [infoData, setInfoData] = useState([]);

  const token = localStorage.getItem("asset_token");

  useEffect(() => {
    const LoadItemMusic = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${id}/tracks?limit=20
        `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setInfoData(data?.items);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    LoadItemMusic();
  }, [id]);

  return (
    <div className="container">
      <div className="playlist__info">
        <div className="playlistinfo__info_music_titles">
          <p className="music__title">TITLE</p>
          <p className="playlistinfo__info_music_titles_album music__title">
            ALBUM
          </p>
          <p className="playlistinfo__info_music_titles_data music__title">
            DURATION OF MUSIC
          </p>
        </div>
        <hr />
        {infoData?.map((item, id) => (
          <div key={id}>
            <div className="playlistInfo__img_audio_paragraph">
              <div className="playlistInfo__img_audio">
                <div className="playlistInfo__img_paragraphs">
                  <img
                    className="playlistInfo__img_paragraphs_img"
                    src={item.track.album.images[2].url}
                    alt="img"
                  />
                  <div className="playlistInfo__music_paragraph">
                    <p className="playlistInfo__music_paragraph_name1">
                      {item.track.name.length > 10
                        ? `${item.track.name.slice(0, 10)}...`
                        : item.track.name}
                    </p>

                    <p className="playlistInfo__music_paragraph_name2">
                      {item.track.artists[0].name}
                    </p>
                  </div>
                </div>
                <p className="playlistInfo__music_album_name">
                  {item.track.name.length > 15
                    ? `${item.track.name.slice(0, 15)}...`
                    : item.track.name}
                </p>
                <audio
                  className="playlist__info_music"
                  controls
                  src={item.track.preview_url}
                ></audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
