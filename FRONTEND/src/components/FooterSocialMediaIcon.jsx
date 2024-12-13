
const FooterSocialMediaIcon = ({ Icons }) => {
  return (
    <div className="text-teal-500">
      {Icons.map((icon) => (
        <a
          key={icon.name}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 cursor-pointer inline-flex items-center
          mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
          duration-300"
        >
          <ion-icon name={icon.name}></ion-icon>
        </a>
      ))}
    </div>
  );
};

export default FooterSocialMediaIcon;