import Logo from "../Logo";
import FooterImg from "@/assets/images/footer-bg.webp";
import { maxWidth } from "@/styles";
import { cn } from "@/utils/helper";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundImage: `
            linear-gradient(rgba(0,0,0,0.075), rgba(0,0,0,0.075))
        , url(${FooterImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="dark:bg-black sm:py-10 xs:py-8 py-[30px] w-full"
    >
      <div
        className={cn(
          maxWidth,
          ` flex flex-col items-center lg:gap-2 md:gap-12 sm:gap-8 xs:gap-[30px] gap-6`
        )}
      >
        <Logo logoColor="text-primary" />
        <p className="text-white p-0">Made with 🤍 by 
          <a className="font-bold" rel="noreferrer" target="_blank" href="https://www.instagram.com/_abdujabbarof_/"> _abdujabbarof_</a>
        </p>
        <p className="xs:text-[12px] text-[11.75px]  sm:mb-6 mb-[20px] text-center font-nunito dark:text-gray-200">
          &copy; {new Date().getFullYear()} MyMoVieS. All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
