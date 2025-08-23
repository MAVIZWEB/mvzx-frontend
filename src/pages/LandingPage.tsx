{/* Header */}
<header className="sticky top-0 z-30 bg-[#E60000] backdrop-blur-sm border-b border-white/10">
  <div className="flex items-center justify-between px-4 pt-3">
    <div className="flex items-center gap-2">
      <img
        src="https://i.imgur.com/VbxvCK6.jpeg"
        alt="MAVIZ"
        className="h-8 w-8 rounded-full ring-2 ring-white/30"
      />
    </div>
    <div className="text-center leading-tight">
      <h1 className="text-[15px] font-extrabold tracking-wide">MAVIZ SWAPS</h1>
      <p className="text-[12px] opacity-95">Token Swap & Earn</p>
    </div>
    <div className="flex items-center gap-3">
      <Button
        onClick={() => navigate("/signup")}
        className="px-3 py-1 text-xs rounded-full bg-white/20 hover:bg-white/30 border border-white/20"
      >
        <User className="w-3.5 h-3.5 mr-1" />
        Sign Up
      </Button>
      <Button
        onClick={() => navigate("/dashboard")}
        className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
      >
        <Menu className="w-4 h-4" />
      </Button>
    </div>
  </div>
  <div className="px-4 pb-2 pt-1">
    <p className="text-[12px] opacity-95">
      MAVIZ – P2P Escrow Swap, Games, Airdrop, Mining, Unlock Affiliate Rewards in USDT, Spin &
      Earn, Voting & more
    </p>
    {demoWarning && (
      <p className="text-[12px] text-yellow-300 font-semibold mt-1">
        ⚠️ This is a demo until signup
      </p>
    )}
  </div>
</header>

{/* Wheel Container */}
<div className="relative" style={{ width: wheelSize, height: wheelSize }}>
  <div
    ref={wheelRef}
    className="absolute inset-0 rounded-full border-4 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    style={{
      transform: `rotate(${rotation}deg)`,
      transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
    }}
  >
    {prizes.map((label, i) => {
      const segmentAngle = 360 / prizes.length;
      const rotateAngle = i * segmentAngle;

      const stickerColors = [
        "#f9a8d4", // pink
        "#93c5fd", // blue
        "#86efac", // green
        "#fde047", // yellow
        "#c4b5fd", // lilac
        "#fca5a5", // light red
      ];

      return (
        <div
          key={i}
          className="absolute w-full h-full"
          style={{ transform: `rotate(${rotateAngle}deg)` }}
        >
          {/* Divider line */}
          <div
            className="absolute left-1/2 top-0 w-px h-1/2 bg-white/30"
            style={{ transform: `rotate(${segmentAngle}deg)` }}
          ></div>

          {/* Prize sticker */}
          <div
            className="absolute left-1/2 top-1/2 px-2 py-1 text-xs font-bold text-black rounded-md"
            style={{
              backgroundColor: stickerColors[i % stickerColors.length],
              transform: `rotate(${segmentAngle / 2}deg) translateX(35%) rotate(90deg)`,
              transformOrigin: "left center",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        </div>
      );
    })}
  </div>

  {/* Center circle */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-1/4 h-1/4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
      <Sparkles className="w-1/2 h-1/2 text-yellow-300" />
    </div>
  </div>
</div>
