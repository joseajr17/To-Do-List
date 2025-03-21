export const LayoutComponents = (props) => {
    return (
      <div className="max-w-sm mx-auto my-auto p-8 w-1/2 bg-white shadow-lg rounded-xl text-black font-sans">
        <h2 className="text-2xl font-semibold text-center mb-4">{ props.title }</h2>
        { props.children }
      </div>
    );
  };
  