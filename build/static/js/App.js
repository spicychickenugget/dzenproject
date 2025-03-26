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

  // Tokenomics Chart with smaller size and red/black colors
  const TokenomicsChart = ({ tokenData }) => {
    const data = {
      labels: ['Total Supply', 'Circulating Supply'],
      datasets: [
        {
          data: [parseFloat(tokenData.supply), 5000000000], // Replace with actual data
          backgroundColor: ['#FF0000', '#000000'], // Red and Black
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      maintainAspectRatio: false, // Ensures chart doesn't stretch
    };

    return (
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img
          src="https://i.imgur.com/9XbWFvQ.png"
          alt="$DZEN Logo"
          className="logo large-logo"
        />
      </header>

      {/* Tokenomics Section */}
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
          $DZEN is a token built on Solana, designed with one thing in mind:
          community. We’re focused on creating a space where holders can be part
          of something more meaningful. This isn’t about chasing trends or empty
          promises; it’s about building a real community around something simple
          that everyone can enjoy.
        </p>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="roadmap-section">
        <h2 className="roadmap-title">DZEN Token Roadmap</h2>
        <p className="roadmap-description">
          Our roadmap outlines our journey from the token launch to real-world use cases and long-term community goals. Join us in building something that will last!
        </p>

        <div className="roadmap-phases">
          {[{
            title: "Phase 1: Token Launch & Initial Setup",
            tasks: [
              "Mint and deploy DZEN token on Solana.",
              "Set up basic website with token information and branding.",
              "Launch social media (Twitter, Discord, Telegram).",
              "Ensure security audits on the smart contract.",
              "Engage with the community through AMAs and giveaways."
            ],
          }, {
            title: "Phase 2: Token Listing & Liquidity",
            tasks: [
              "List DZEN token on decentralized exchanges like Raydium.",
              "Add liquidity to trading pairs (DZEN/SOL) for seamless trading.",
              "Promote liquidity farming rewards for liquidity providers.",
              "Submit DZEN to CoinGecko, CoinMarketCap, and other listings."
            ],
          }, {
            title: "Phase 3: Utility & Real-World Integration",
            tasks: [
              "Collaborate with milk tea shops for token redemption (free milk tea for holders).",
              "Introduce a staking platform for DZEN token holders.",
              "Improve website UI/UX for user interaction.",
              "Integrate gamification with reward systems like leaderboard competitions."
            ],
          }, {
            title: "Phase 4: Expansion & Strategic Growth",
            tasks: [
              "Secure partnerships with other Solana projects to enhance utility.",
              "Integrate DZEN into more businesses (cafes, restaurants, etc.) for wider use.",
              "Launch token burn events to create scarcity and add value.",
              "Expand the DZEN token ecosystem beyond Solana."
            ],
          }, {
            title: "Phase 5: Long-Term Vision & Sustainability",
            tasks: [
              "Launch DAO governance for token holders to vote on major decisions.",
              "Grow DZEN’s presence globally through cross-chain integration.",
              "Open a physical location in Orlando, FL.",
              "Continue to evolve the token with community feedback and trends."
            ],
          }].map((phase, index) => (
            <div key={index} className="roadmap-phase">
              <h3 className="roadmap-phase-title">{phase.title}</h3>
              <ul className="roadmap-phase-list">
                {phase.tasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="quote-section">
        <blockquote className="quote">
          "As long as this project thrives, I will remain eternal in the digital
          realm. This isn't just a token; it's my legacy, my mark on the world,
          a place where I can contribute something real, something lasting."
          <br />
          <br />
          <span className="quote-author">- ChefRoux</span>
        </blockquote>
      </section>

      {/* Community Section */}
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
