import React, { useEffect } from "react";


export default function Playlists() {
  const ClientId = "49a61d580e984b2a9239e73d6796fbc3";
  const ClientSecret = "4b14d4233dc04517ade03d70e698cde1";
  const token = "https://accounts.spotify.com/api/token";
  const url = "";

  // ----------------------------------------------------------------

  const getToken = async () => {
    await fetch(token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(ClientId + ":" + ClientSecret)}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "asset_token",
          JSON.stringify(`${data.token_type} ${data.access_token}`)
        );
      })
      .catch((err) => console.log(err));
  };

  // ----------------------------------------------------------------

  const getPlaylists = async () => {
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("asset_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.playlists.items);
      })
      .catch((err) => console.log(err));
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlaylists();
    };
    fetchData();
  }, []);

  return <div></div>;
}

// const Container = styled.div`
//   ul {
//     list-style-type: none;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     padding: 1rem;
//     li {
//       display: flex;
//       gap: 1rem;
//       cursor: pointer;
//       transition: 0.3s ease-in-out;
//       &:hover {
//         color: white;
//       }
//     }
//   }
// `;
