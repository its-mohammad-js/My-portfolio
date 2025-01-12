import InfinityCanvas from "../canvas/InfinityCanvas";

function Contact() {
  return (
    <div className="size-full flex items-center justify-between flex-col">
      <div className="w-full h-1/3 px-4 flex justify-center flex-col text-xl lg:text-4xl font-semibold">
        <div className="flex items-center">
          Develop every idea in an
          <div className="w-fit h-fit inline-flex items-center justify-center">
            <InfinityCanvas />
          </div>
          way :
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
        modi earum est ut sint .
      </div>

      <div className="w-full h-1/2 rounded-t-xl flex-col gap-16 bg-gray-200/10 flex items-center justify-center">
        <h4 className="text-center text-4xl lg:text-5xl leading-[3rem] font-bold">
          GET IN TOUCH ON <br />
          <p>Linkedin</p>
        </h4>

        <button
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/mohammadarab-frontend/",
              "_blank"
            );
          }}
          className="bg-gray-200 font-bold text-gray-950 px-4 py-2 rounded-3xl"
        >
          My Linkedin
        </button>
      </div>
    </div>
  );
}

export default Contact;
