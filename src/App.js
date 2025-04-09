import { Connection, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "@fontsource/orbitron";
import "@fontsource/share-tech-mono";
import "@fontsource/major-mono-display";
import "./styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const TOKEN_MINT_ADDRESS = "AdPHpzzZSY8QaswH3wLggoaCKVR3mQb71SkM5bXe7WTf";
const SOLANA_RPC = "https://blissful-multi-surf.solana-mainnet.quiknode.pro/eac6f47e41719f0d1076eadd88a368a433b64e9b";
const METADATA_URL = "https://crimson-voluntary-lynx-323.mypinata.cloud/ipfs/bafkreib7k4dlkep76qzv4m3jqmvpvbu2k5l7ti2zgw2ytla3mpnwgg2kfi";

const App = () => {
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    document.title = "$DZEN";

    if (!document.querySelector("link[rel='icon']")) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = "https://i.imgur.com/9XbWFvQ.png";
      document.head.appendChild(favicon);
    }

    const fetchTokenData = async () => {
      try {
        const connection = new Connection(SOLANA_RPC, "confirmed");
        const mintPubkey = new PublicKey(TOKEN_MINT_ADDRESS);
        const mintInfo = await getMint(connection, mintPubkey, TOKEN_PROGRAM_ID);

        const metadataResponse = await fetch(METADATA_URL);
        if (!metadataResponse.ok) throw new Error("Failed to fetch metadata");

        const metadata = await metadataResponse.json();

        setTokenData({
          name: metadata.name || "Unknown",
          symbol: metadata.symbol || "N/A",
          image: metadata.image || "https://via.placeholder.com/150",
          supply: mintInfo.supply.toString(),
        });
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchTokenData();
  }, []);

  const TokenomicsChart = ({ tokenData }) => {
    const data = {
      labels: ["Total Supply", "Circulating Supply"],
      datasets: [
        {
          data: [parseFloat(tokenData.supply), 5000000000],
          backgroundColor: ["#FF0000", "#000000"],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      maintainAspectRatio: false,
    };

    return (
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="container">
      <header className="header">
        <img
          src="https://i.imgur.com/9XbWFvQ.png"
          alt="$DZEN Logo"
          className="logo large-logo"
        />
      </header>

      <section className="section">
        <h2 className="section-title">Tokenomics</h2>
        {tokenData ? (
          <>
            <p className="section-text">
              Name: <span className="highlight">{tokenData.name}</span>
            </p>
            <p className="section-text">
              Symbol: <span className="highlight">{tokenData.symbol}</span>
            </p>
            <p className="section-text">
              Total Supply: <span className="highlight">{tokenData.supply}</span>
            </p>
            <TokenomicsChart tokenData={tokenData} />
          </>
        ) : (
          <p className="loading-text">Loading token data...</p>
        )}
      </section>

      {/* About Section */}
      <section className="section">
        <p className="section-text">
          $DZEN is a token built on the Solana mainnet.
        </p>
        <p className="section-text">
        This isn’t some hype project. I’m a Solana dev when I’m not stuck in a busy kitchen. This whole thing — the token, the milk tea, the tech — it’s all coming from me. I don’t have some big team or venture money. Just a few Discord mods helping hold it together while I pour the last of what I’ve got into it.
        </p>
        <p className="section-text">
          I love milk tea, It keeps me away from the bottle. I make the best damn milk tea you’ve never tasted, and I want to share it. Every $DZEN holder gets a shelf-stable bottle sent to them annually. That’s the whole point. I needed something to build. Something real. This is it.
        </p>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="roadmap-section">
        <h2 className="roadmap-title">DZEN Roadmap</h2>
        <p className="roadmap-description">
          This isn’t a roadmap for hype. This is just what’s getting done, when it’s getting done.
        </p>

        <div className="roadmap-phases">
          <div className="roadmap-phase">
            <h3 className="roadmap-phase-title">Phase 1: The Drop</h3>
            <ul className="roadmap-phase-list">
              <li>Token minted and deployed on Solana mainnet.</li>
              <li>Site launched, socials up. Everything built from scratch.</li>
              <li>Community on Discord — no bots, just real people.</li>
            </ul>
          </div>

          <div className="roadmap-phase">
            <h3 className="roadmap-phase-title">Phase 2: Getting Seen</h3>
            <ul className="roadmap-phase-list">
              <li>Get $DZEN listed on major centralized exchanges.</li>
              <li>Push out promo in waves — no fake hype, just slow burn.</li>
              <li>Token-gated ordering through Discord — simple and secure.</li>
            </ul>
          </div>

          <div className="roadmap-phase">
            <h3 className="roadmap-phase-title">Phase 3: Real Utility</h3>
            <ul className="roadmap-phase-list">
              <li>Annual milk tea drops — shelf-stable, handcrafted, sent to holders.</li>
              <li>Build a small-scale staking model. Not for pumps, just passive return.</li>
            </ul>
          </div>

          <div className="roadmap-phase">
            <h3 className="roadmap-phase-title">Phase 4: Scaling Without Selling Out</h3>
            <ul className="roadmap-phase-list">
              <li>Expand the tea drops. More flavors, more precision.</li>
              <li>Integrate with other Solana tools and projects where it makes sense.</li>
            </ul>
          </div>

          <div className="roadmap-phase">
            <h3 className="roadmap-phase-title">Phase 5: Keep It Alive</h3>
            <ul className="roadmap-phase-list">
              <li>Focus on stability. No wild promises, just consistency.</li>
              <li>Keep it alive. Even after I fall overboard.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="quote" className="quote-section">
        <blockquote className="quote">
          "$DZEN isn't just a token. It's a real project made by someone who actually gives a shit. I'm here to build something that lasts — for myself, for the community, and for anyone who's ever wanted something more solid in this space."
          <br />
          <br />
          <span className="quote-author">- ChefRoux</span>
        </blockquote>
      </section>

      <section className="section">
        <h2 className="section-title">Join the Community</h2>
        <p className="section-text">Connect with us on:</p>
        <ul className="social-links">
          <li>
            <a href="https://x.com/chefrouxx" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://discord.gg/Sr5yYm56vx" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/chefrouxx/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default App;
