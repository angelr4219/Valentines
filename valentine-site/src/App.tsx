import { useEffect, useMemo, useState } from "react";
import "./App.css";

type View = "closed" | "open" | "flip";

function TenorGif() {
  useEffect(() => {
    const src = "https://tenor.com/embed.js";
    if (document.querySelector(`script[src="${src}"]`)) return;

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      className="tenor-gif-embed"
      data-postid="10586631440146974859"
      data-share-method="host"
      data-aspect-ratio="0.935743"
      data-width="100%"
    >
      <a href="https://tenor.com/view/minion-minion-loves-loves-love-i-love-you-gif-10586631440146974859">
        Minion Minion Loves GIF
      </a>
      {" "}from{" "}
      <a href="https://tenor.com/search/minion-gifs">Minion GIFs</a>
    </div>
  );
}


export default function App() {
  // Personalize 💌
  const toName = "Elizabeth";
  const nickname = "Poke";
  const fromName = "Angel";

  // Valentine prompt behavior
  const MAX_YES = 2.2;     // max scale for YES
  const MIN_NO = 0.35;     // min scale for NO
  const YES_STEP = 0.18;   // growth per "No"
  const NO_STEP = 0.10;    // shrink per "No"

  const [accepted, setAccepted] = useState(false);
  const [cardPop, setCardPop] = useState(false);

  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);

  const [view, setView] = useState<View>("closed");

  const shortMsg =
    "Poke, you’re my favorite person, my favorite feeling, and my favorite future.";
  const longMsg =
    "Thank you for being you. I love the way you make ordinary days feel softer and brighter. I’m so lucky I get to love you.";

  const photos = useMemo(
    () => [
      { label: "Photo 1", className: "p1" },
      { label: "Photo 2", className: "p2" },
      { label: "Photo 3", className: "p3" },
      { label: "Photo 4", className: "p4" },
    ],
    []
  );

  function acceptYes() {
    setAccepted(true);
    setView("closed");
    setCardPop(true);
    window.setTimeout(() => setCardPop(false), 650);
  }

  function handleNo() {
    const nextYes = Math.min(MAX_YES, +(yesScale + YES_STEP).toFixed(2));
    const nextNo = Math.max(MIN_NO, +(noScale - NO_STEP).toFixed(2));

    setYesScale(nextYes);
    setNoScale(nextNo);

    // When max reached, auto-accept like "Yes" was clicked
    if (nextYes >= MAX_YES) {
      window.setTimeout(() => acceptYes(), 280);
    }
  }

  const isClosed = view === "closed";
  const isOpen = view === "open";
  const isFlip = view === "flip";

  return (
    <div className="page">
      <main className="wrap">
        {!accepted ? (
          <section className="askCard">
            <h1 className="title">Hey {toName} 💖</h1>
            <p className="subtitle">
              <strong>{nickname}</strong>… do you want to be my Valentine?
            </p>

            <div className="gifBox">
              <TenorGif />
            </div>

            <div className="askButtons">
              <button
                className="btn primary yesBtn"
                style={{ transform: `scale(${yesScale})` }}
                onClick={acceptYes}
              >
                Yes 💘
              </button>

              <button
                className="btn noBtn"
                style={{ transform: `scale(${noScale})` }}
                onClick={handleNo}
              >
                No
              </button>
            </div>

            <p className="tinyTip">
              (pls dont press no)
            </p>
          </section>
        ) : (
          <>
            <h1 className="title">A Valentine for {toName} 💌</h1>
            <p className="subtitle">
              For <strong>{nickname}</strong>. Open the envelope, then flip for photos.
            </p>

            <section
              className={[
                "cardStage",
                cardPop ? "popIn" : "",
                isClosed ? "state-closed" : "",
                isOpen ? "state-open" : "",
                isFlip ? "state-flip" : "",
              ].join(" ")}
            >
              <div className="card3d">
                <div className="cardInner">
                  {/* FRONT */}
                  <div className="face faceFront">
                    <div className="envelope">
                      <div className="envPaper" />
                      <div className="envBody" />
                      <div className="envFlap" />

                      <div className="envLabel">
                        <div className="toLine">
                          <span className="label">To:</span>{" "}
                          <strong>{toName}</strong>{" "}
                          <span className="nick">({nickname})</span>
                        </div>
                        <div className="fromLine">
                          <span className="label">From:</span>{" "}
                          <strong>{fromName}</strong>
                        </div>
                      </div>

                      <div className="seal" aria-hidden="true">
                        ❤
                      </div>

                      {/* Letter slides out when open */}
                      <div className="letter">
                        <div className="letterHeader">
                          <div className="mini">Happy Valentine’s Day</div>
                          <div className="big">
                            {toName} <span className="nick">({nickname})</span>
                          </div>
                        </div>

                        <p className="letterText">{shortMsg}</p>
                        <p className="letterText muted">{longMsg}</p>

                        <div className="signature">
                          Love, <strong>{fromName}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="controls">
                      {isClosed && (
                        <button className="btn primary" onClick={() => setView("open")}>
                          Open the envelope
                        </button>
                      )}
                      {isOpen && (
                        <>
                          <button className="btn" onClick={() => setView("closed")}>
                            Close
                          </button>
                          <button className="btn primary" onClick={() => setView("flip")}>
                            Flip for photos →
                          </button>
                        </>
                      )}
                      {isFlip && (
                        <button className="btn" onClick={() => setView("open")}>
                          ← Flip back
                        </button>
                      )}
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="face faceBack">
                    <div className="photoSide">
                      <div className="photoHeader">
                        <h2>Us 🫶</h2>
                        <p>Replace the placeholders with your favorites.</p>
                      </div>

                      <div className="photoGrid">
                        {photos.map((p) => (
                          <div key={p.label} className={`photo ${p.className}`}>
                            <span className="photoLabel">{p.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="controls">
                        <button className="btn" onClick={() => setView("open")}>
                          ← Flip back
                        </button>
                        <button className="btn primary" onClick={() => setView("closed")}>
                          Close it
                        </button>
                      </div>

                      <p className="tinyTip">
                        Tip: Put images in <code>src/assets</code> and set them in CSS
                        (see <code>.p1</code>–<code>.p4</code>).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
