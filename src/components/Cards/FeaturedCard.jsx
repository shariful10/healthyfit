const FeaturedCard = ({ singleClass }) => {
  return (
    <div className="max-w-sm min-h-full rounded overflow-hidden shadow-lg bg-white mt-4">
      <img src={singleClass.image} alt="image" />
      <h2 className="text-xl font-semibold pt-2">{singleClass.title}</h2>
      <p>{singleClass.dec}</p>
      <button className="mt-4 px-4 py-2 text-white rounded-md bg-blue-500 ">
        Read More
      </button>
    </div>
  );
};

export default FeaturedCard;
