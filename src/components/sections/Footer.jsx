function Footer() {
  return (
    <div className="size-full px-2">
      <div className="w-full h-[85%] lg:h-[90%] flex items-center gap-y-24 justify-center flex-col">
        <h4 className="text-7xl lg:text-9xl text-current font-bold">
          Let's talk !
        </h4>
        <button
          onClick={() => {
            window.open("https://t.me/DevWeb23333", "_blank");
          }}
          className="bg-gray-800/50 rounded-3xl text-3xl px-12 py-6"
        >
          Telegram
        </button>
      </div>

      <div className="w-full flex-col lg:flex-row gap-2 lg:h-[10%] flex lg:justify-between items-start justify-normal lg:items-center px-4">
        <p>Made By Mohammad arab</p>
        <div className="flex [&>p]:cursor-pointer items-center gap-2 lg:gap-4">
          <p
            onClick={() => {
              window.open("https://t.me/DevWeb23333", "_blank");
            }}
          >
            telegram
          </p>
          <p>+989396356829</p>
          <p
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/mohammadarab-frontend/",
                "_blank"
              );
            }}
          >
            linkedin
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
