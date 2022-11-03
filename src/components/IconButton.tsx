export default function IconButton(props: React.ComponentProps<"button">) {
  return (
    <>
      <button {...props} />
      <style jsx>{`
        button {
          all: unset;
          place-items: center;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: grid;
          height: 2.5rem;
          width: 2.5rem;
        }

        button:nth-child(2) {
          font-size: 2rem;
          height: 3.5rem;
          width: 3.5rem;
        }

        button:hover {
          background: #222222;
        }
      `}</style>
    </>
  );
}
