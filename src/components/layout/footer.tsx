export function Footer() {
  const currentYear = new Date().getFullYear();
  const ecomexpertsUrl = "https://ecomexperts.io";
  const jrazapUrl = "https://jrazap.com";

  return (
    <footer className="border-t border-[#CED6DE]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-4 px-4 py-8 lg:px-6">
        <p className="text-sm text-pewter">
          &copy; {currentYear} Task For{" "}
          <a
            href={ecomexpertsUrl}
            target="_blank"
            className="underline hover:text-mckenzie"
          >
            Ecom Experts
          </a>{" "}
          By{" "}
          <a href={jrazapUrl} className="underline hover:text-mckenzie">
            Mohamed Elazap
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
